"""Gera dist-static/ (site estatico pronto para hospedagem tradicional)."""
import asyncio, os, re, shutil, json
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, "dist-static")
IMG = os.path.join(OUT, "images")
GTM = "GTM-MN4SDQFZ"

CSS_JS = r"""
() => {
  const keep = [];
  const matches = (sel) => {
    const clean = sel.split(',').map(s => s
      .replace(/::?(before|after|placeholder|selection|first-line|backdrop|marker|file-selector-button)/g, '')
      .replace(/:(hover|focus|focus-visible|focus-within|active|disabled|checked|visited|target|open|not\([^)]*\)|is\([^)]*\)|where\([^)]*\)|has\([^)]*\)|nth-[^ ]*)/g, '')
      .trim()).filter(Boolean);
    for (const c of clean) {
      try { if (document.querySelector(c)) return true; } catch (e) { return true; }
    }
    return false;
  };
  const walk = (rules, out) => {
    for (const r of rules) {
      if (r.type === CSSRule.STYLE_RULE) { if (matches(r.selectorText)) out.push(r.cssText); }
      else if (r.type === CSSRule.MEDIA_RULE || r.constructor.name === 'CSSSupportsRule' || r.constructor.name === 'CSSLayerBlockRule') {
        const inner = []; walk(r.cssRules, inner);
        if (inner.length) {
          const cond = r.conditionText !== undefined ? r.conditionText : (r.name || '');
          const at = r.type === CSSRule.MEDIA_RULE ? '@media ' + r.conditionText : (r.constructor.name === 'CSSSupportsRule' ? '@supports ' + r.conditionText : '@layer ' + (r.name || ''));
          out.push(at + '{' + inner.join('') + '}');
        }
      }
      else if (r.constructor.name === 'CSSPropertyRule' || r.type === CSSRule.KEYFRAMES_RULE || r.type === CSSRule.FONT_FACE_RULE) out.push(r.cssText);
      else if (r.type === CSSRule.IMPORT_RULE) { /* skip */ }
      else out.push(r.cssText);
    }
  };
  for (const sheet of document.styleSheets) {
    try { walk(sheet.cssRules, keep); } catch (e) {}
  }
  return keep.join('\n');
}
"""


def minify_css(css: str) -> str:
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    css = re.sub(r"\s+", " ", css)
    css = re.sub(r"\s*([{}:;,>~])\s*", r"\1", css)
    css = css.replace(";}", "}")
    return css.strip()


async def main():
    os.makedirs(IMG, exist_ok=True)
    # imagens locais
    src_assets = os.path.join(ROOT, "src", "assets")
    mapping = {}
    for name in os.listdir(src_assets):
        if name.endswith(".webp"):
            shutil.copy(os.path.join(src_assets, name), os.path.join(IMG, name))
            mapping[name[:-5]] = "images/" + name

    async with async_playwright() as p:
        b = await p.chromium.launch(headless=True)
        page = await (await b.new_context(viewport={"width": 1280, "height": 1800})).new_page()
        await page.goto("http://localhost:8080/", wait_until="networkidle")
        await page.wait_for_timeout(1200)
        # abre e fecha todos os itens do FAQ para o CSS de estado ser capturado
        css = minify_css(await page.evaluate(CSS_JS))
        html = await page.content()
        await b.close()

    # remove scripts de dev/modulos e preloads de modulos
    html = re.sub(r"<script\b[^>]*>.*?</script>", "", html, flags=re.S)
    html = re.sub(r"<link[^>]+rel=\"(modulepreload|stylesheet|preload)\"[^>]*>", "", html)
    html = re.sub(r"<style[^>]*>.*?</style>", "", html, flags=re.S)

    # troca urls de assets com hash por arquivos locais
    def fix_src(m):
        url = m.group(2)
        base = os.path.basename(url.split("?")[0])
        stem = re.sub(r"\.(webp|png|jpg|jpeg|svg)$", "", base)
        if stem not in mapping:
            stem = re.sub(r"-[A-Za-z0-9_]{6,}$", "", stem)
        return f'{m.group(1)}="{mapping.get(stem, url)}"'

    html = re.sub(r'(src|href)="(/[^"]*\.(?:webp|png|jpg|jpeg|svg)[^"]*)"', fix_src, html)

    faces = "".join(l for l in open(os.path.join(ROOT, "src", "styles.css"), encoding="utf-8").read().splitlines() if l.startswith("@font-face")).replace("'/fonts/", "'fonts/")
    if "@font-face" not in css:
        css = faces + css

    hero = mapping.get("hero", "images/hero.webp")
    app_js = open(os.path.join(ROOT, "static-src", "app.js"), encoding="utf-8").read()

    head_top = (
        "<meta charset=\"utf-8\">"
        "<!-- Google Tag Manager -->\n<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n"
        "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n"
        "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n"
        "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n"
        f"}})(window,document,'script','dataLayer','{GTM}');</script>\n<!-- End Google Tag Manager -->"
        f'<link rel="preload" as="image" href="{hero}" fetchpriority="high">'
        '<link rel="preload" as="font" type="font/woff2" crossorigin href="fonts/xn7gYHE41ni1AdIRggexSg.woff2">'
        '<link rel="preload" as="font" type="font/woff2" crossorigin href="fonts/xMQ9uFFYT72X5wkB_18qmnndmSdSnh2BAfO5mnuyOo1lfiQwWa-xsaQ.woff2">'
        '<link rel="icon" href="favicon.png">'
        f"<style>{css}</style>"
    )
    html = re.sub(r"<html[^>]*>", '<html lang="pt-BR">', html, count=1)
    html = re.sub(r'\s(?:data-tsd-source|data-lov-id|data-lov-name|data-component-path|data-component-line|data-component-file|data-component-name|data-component-content)="[^"]*"', "", html)
    html = re.sub(r"<head[^>]*>", "<head>" + head_top.replace("\\", "\\\\"), html, count=1)
    noscript = (
        f'<noscript><iframe src="https://www.googletagmanager.com/ns.html?id={GTM}"'
        ' height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>'
    )
    html = re.sub(r"(<body[^>]*>)", r"\1" + noscript, html, count=1)
    html = html.replace("</body>", f"<script>{app_js}</script></body>")

    with open(os.path.join(OUT, "index.html"), "w", encoding="utf-8") as f:
        f.write(html)
    print("index.html", len(html), "css", len(css))


asyncio.run(main())
