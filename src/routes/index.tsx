import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { PHONE_DISPLAY, PHONE_TEL, WA_MESSAGES, waLink } from "@/lib/whatsapp";
import officialLogoAsset from "@/assets/art-climatizacao-logo.png.asset.json";
import antes from "@/assets/antes-placeholder.jpg";
import depois from "@/assets/depois-placeholder.jpg";
import galeria1 from "@/assets/galeria-1.jpg";
import galeria2 from "@/assets/galeria-2.jpg";
import galeria3 from "@/assets/galeria-3.jpg";

const TITLE = "Limpeza de Ar-Condicionado Residencial em Alagoas | Art-Climatização";
const DESCRIPTION =
  "Precisa de limpeza de ar-condicionado residencial em Alagoas? Fale com a Art-Climatização pelo WhatsApp e consulte a disponibilidade de atendimento.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Art-Climatização",
          description:
            "Limpeza e higienização de ar-condicionado residencial em Alagoas.",
          telephone: PHONE_TEL,
          areaServed: { "@type": "State", name: "Alagoas" },
        }),
      },
    ],
  }),
});

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex min-w-0 items-center gap-2 ${className}`}>
      <img
        src={officialLogoAsset.url}
        alt="Art-Climatização"
        width={820}
        height={287}
        className="h-6 w-auto shrink-0 sm:h-7"
      />
    </div>
  );
}

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-5 py-14 sm:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}

function CtaWhats({
  children,
  message,
  variant = "cta",
}: {
  children: React.ReactNode;
  message?: string;
  variant?: "cta" | "whatsapp" | "brand" | "outlineBrand";
}) {
  return (
    <Button asChild size="xl" variant={variant}>
      <a href={waLink(message)} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </Button>
  );
}

const sinais = [
  { t: "Mau cheiro", d: "Aquele cheiro estranho ao ligar o aparelho." },
  { t: "Sujeira acumulada", d: "Poeira presa nos filtros e nas partes internas." },
  { t: "Aparência de sujeira", d: "Manchas e marcas visíveis nas grades e na carcaça." },
  { t: "Ambiente menos agradável", d: "O ar do cômodo já não parece o mesmo." },
  { t: "Desempenho diferente", d: "O aparelho não está funcionando como antes." },
  { t: "Hora de cuidar", d: "Faz tempo desde a última higienização." },
];

const beneficios = [
  { t: "Mais cuidado com o ambiente", d: "Remover a sujeira acumulada contribui para um ambiente mais agradável." },
  { t: "Mais cuidado com o equipamento", d: "A limpeza faz parte dos cuidados básicos com o aparelho." },
  { t: "Melhores condições de funcionamento", d: "Um aparelho limpo trabalha em condições mais adequadas." },
  { t: "Menos desperdício", d: "Ajuda a evitar desperdícios relacionados ao acúmulo de sujeira." },
];

const etapas = [
  { t: "Você chama pelo WhatsApp", d: "Conta o que está acontecendo com o seu aparelho." },
  { t: "Entendemos sua necessidade", d: "Conversamos sobre o tipo de aparelho e a situação." },
  { t: "Combinamos o atendimento", d: "Alinhamos o melhor momento para a visita." },
  { t: "Realizamos a limpeza", d: "Fazemos a limpeza e higienização do seu ar-condicionado." },
];

const faq = [
  {
    q: "Quanto custa a limpeza?",
    a: "O valor depende do tipo e das condições do aparelho. Envie uma mensagem no WhatsApp contando qual é o seu equipamento para consultar as condições de atendimento.",
  },
  {
    q: "Quanto tempo demora?",
    a: "O tempo varia conforme o aparelho e a situação encontrada. Pelo WhatsApp conseguimos te orientar melhor sobre o seu caso.",
  },
  {
    q: "Vocês atendem no mesmo dia?",
    a: "A disponibilidade varia conforme a agenda do dia. Consulte pelo WhatsApp para verificar o atendimento mais próximo.",
  },
  {
    q: "Vocês atendem minha cidade?",
    a: "O atendimento é realizado em Alagoas. Envie sua localização pelo WhatsApp para confirmarmos o atendimento na sua região.",
  },
  {
    q: "Quais tipos de ar-condicionado vocês limpam?",
    a: "Trabalhamos com limpeza e higienização de ar-condicionado residencial. Nos diga pelo WhatsApp qual é o modelo do seu aparelho para confirmarmos.",
  },
  {
    q: "Como faço para agendar?",
    a: "É só chamar no WhatsApp. A conversa começa entendendo a sua necessidade e, em seguida, combinamos o atendimento.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3">
          <Logo />
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`tel:${PHONE_TEL}`}
              className="hidden text-sm font-semibold text-muted-foreground hover:text-foreground sm:block"
            >
              {"\n"}
            </a>
            <Button asChild size="sm" variant="brand">
              <a href={waLink()} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
        <div className="h-0.5 w-full wave-rule opacity-80" />
      </header>

      {/* HERO */}
      <Section className="pt-10 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="mt-5 text-3xl font-extrabold leading-[1.1] sm:text-5xl">
              Limpeza de ar-condicionado residencial{" "}
              <span className="text-wave">rápida em Alagoas</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Seu ar-condicionado está com mau cheiro, acumulando sujeira ou não está
              funcionando como antes? A Art-Climatização cuida da limpeza do seu aparelho com
              atendimento rápido em Alagoas.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CtaWhats>Quero limpar meu ar-condicionado</CtaWhats>
              <Button asChild size="xl" variant="outlineBrand" className="hidden">
                <a href={`tel:${PHONE_TEL}`}></a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {" "}
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-3xl wave-rule opacity-10 blur-2xl" />
            <img
              src={galeria3}
              alt="Quarto residencial com ar-condicionado split limpo na parede"
              width={1000}
              height={1000}
              className="aspect-square w-full rounded-2xl border border-border object-cover shadow-[var(--shadow-soft)]"
            />
          </div>
        </div>
      </Section>

      {/* ANTES E DEPOIS */}
      <Section className="bg-secondary/40">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-extrabold sm:text-4xl">
            Veja a diferença de um ar-condicionado bem cuidado
          </h2>
          <p className="mt-3 text-muted-foreground">
            A sujeira acumulada nem sempre fica visível por fora. Veja o resultado de uma
            limpeza.
          </p>
        </div>
        <div className="mt-8">
          {/* Substitua as imagens em src/assets por fotos reais do MESMO aparelho */}
          <BeforeAfterSlider beforeSrc={antes} afterSrc={depois} />
          <p className="mt-3 text-xs text-muted-foreground">
            Arraste a divisória para comparar. Imagens ilustrativas — substituir por fotos
            reais da Art-Climatização.
          </p>
        </div>
        <div className="mt-8">
          <CtaWhats>Quero agendar minha limpeza</CtaWhats>
        </div>
      </Section>

      {/* PROBLEMA */}
      <Section>
        <h2 className="max-w-2xl text-2xl font-extrabold sm:text-4xl">
          Seu ar-condicionado está dando algum desses sinais?
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sinais.map((s) => (
            <div
              key={s.t}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
            >
              <div className="h-1 w-8 rounded-full wave-rule" />
              <h3 className="mt-4 text-base font-bold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* VALOR DA LIMPEZA */}
      <Section className="bg-secondary/40">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-extrabold sm:text-4xl">
            Não é apenas sobre deixar o aparelho bonito.
          </h2>
          <p className="mt-3 text-muted-foreground">
            A limpeza ajuda a remover a sujeira acumulada nas partes internas, contribui para
            um ambiente mais agradável e faz parte dos cuidados com o equipamento.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {beneficios.map((b, i) => (
            <div key={b.t} className="rounded-xl border border-border bg-card p-6">
              <span className="font-display text-sm font-bold text-primary">
                0{i + 1}
              </span>
              <h3 className="mt-2 text-lg font-bold">{b.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* AGILIDADE */}
      <Section>
        <div className="relative overflow-hidden rounded-2xl border border-border p-7 sm:p-12">
          <div className="absolute inset-0 -z-10 wave-rule opacity-[0.07]" />
          <h2 className="text-2xl font-extrabold sm:text-4xl">Precisando resolver isso rápido?</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            A Art-Climatização trabalha com atendimento ágil em Alagoas para limpeza de
            ar-condicionado residencial. Fale conosco e verifique a disponibilidade para o seu
            caso.
          </p>
          {/* Espaço reservado para prazo real (ex.: "até 2 horas" / "no mesmo dia") */}
          <div className="mt-6">
            <CtaWhats>Quero agendar minha limpeza</CtaWhats>
          </div>
        </div>
      </Section>

      {/* COMO FUNCIONA */}
      <Section className="bg-secondary/40">
        <h2 className="text-2xl font-extrabold sm:text-4xl">É simples resolver</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {etapas.map((e, i) => (
            <li key={e.t} className="rounded-xl border border-border bg-card p-5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-bold">{e.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{e.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* PROVA DO TRABALHO */}
      <Section>
        <h2 className="text-2xl font-extrabold sm:text-4xl">Nosso trabalho de perto</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Espaço reservado para fotos reais da Art-Climatização: antes, durante, depois e o
          profissional realizando o serviço.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { src: galeria1, legenda: "Durante — profissional realizando a limpeza", alt: "Profissional realizando limpeza de ar-condicionado residencial" },
            { src: galeria2, legenda: "Durante — higienização do filtro", alt: "Filtro de ar-condicionado sendo higienizado" },
            { src: galeria3, legenda: "Depois — aparelho limpo no ambiente", alt: "Ar-condicionado limpo instalado em quarto residencial" },
          ].map((g) => (
            <figure key={g.legenda} className="overflow-hidden rounded-xl border border-border">
              <img
                src={g.src}
                alt={g.alt}
                width={1000}
                height={1000}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
              <figcaption className="border-t border-border bg-card px-4 py-3 text-xs text-muted-foreground">
                {g.legenda}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Imagens ilustrativas — substituir por fotos reais dos atendimentos.
        </p>
      </Section>

      {/* PROVA SOCIAL */}
      <Section className="bg-secondary/40">
        <h2 className="text-2xl font-extrabold sm:text-4xl">A experiência de quem já contratou</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-dashed border-border bg-card p-6 text-sm text-muted-foreground"
            >
              <div className="h-3 w-24 rounded-full bg-muted" />
              <div className="mt-4 space-y-2">
                <div className="h-2.5 w-full rounded-full bg-muted" />
                <div className="h-2.5 w-11/12 rounded-full bg-muted" />
                <div className="h-2.5 w-8/12 rounded-full bg-muted" />
              </div>
              <p className="mt-4 text-xs">Espaço reservado para avaliação real do Google.</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ÁREA DE ATENDIMENTO */}
      <Section>
        <div className="grid gap-6 rounded-2xl border border-border p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-4xl">Atendimento em Alagoas</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Atendemos residências em Alagoas. Envie sua localização pelo WhatsApp e
              confirmamos a disponibilidade de atendimento na sua região.
            </p>
          </div>
          <CtaWhats message={WA_MESSAGES.regiao} variant="brand">
            Verificar atendimento na minha região
          </CtaWhats>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-secondary/40">
        <h2 className="text-2xl font-extrabold sm:text-4xl">Perguntas frequentes</h2>
        <Accordion type="single" collapsible className="mt-6">
          {faq.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-base font-semibold">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* CTA FINAL */}
      <Section>
        <div className="relative overflow-hidden rounded-2xl border border-border p-8 text-center sm:p-14">
          <div className="absolute inset-0 -z-10 wave-rule opacity-[0.08]" />
          <h2 className="text-2xl font-extrabold sm:text-4xl">
            Seu ar-condicionado está precisando de uma limpeza?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Fale com a Art-Climatização pelo WhatsApp: entendemos a sua necessidade e cuidamos
            da limpeza do seu aparelho com atendimento ágil.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaWhats>Quero limpar meu ar-condicionado</CtaWhats>
            <Button asChild size="xl" variant="outlineBrand">
              <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
            </Button>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-border px-5 py-10 pb-28 sm:pb-10">
        <div className="mx-auto grid w-full max-w-5xl gap-6 sm:grid-cols-2">
          <div>
            <Logo />
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Limpeza e higienização de ar-condicionado residencial em Alagoas.
            </p>
          </div>
          <div className="text-sm sm:text-right">
            <p>
              Telefone:{" "}
              <a className="font-semibold hover:text-primary" href={`tel:${PHONE_TEL}`}>
                {PHONE_DISPLAY}
              </a>
            </p>
            <p className="mt-1">
              WhatsApp:{" "}
              <a
                className="font-semibold hover:text-primary"
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                +55 82 98892-8846
              </a>
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              © {new Date().getFullYear()} Art-Climatização
            </p>
          </div>
        </div>
      </footer>

      {/* BOTÃO FIXO MOBILE */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur sm:hidden">
        <Button asChild size="xl" variant="whatsapp" className="w-full">
          <a href={waLink()} target="_blank" rel="noopener noreferrer">
            💬 Quero limpar meu ar-condicionado
          </a>
        </Button>
      </div>
    </div>
  );
}
