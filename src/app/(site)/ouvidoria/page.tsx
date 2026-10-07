import type { Metadata } from "next";
import { PageEndNav } from "@/components/PageEndNav";
import { PageHero } from "@/components/PageHero";
import { OuvidoriaFormTools } from "@/components/OuvidoriaFormTools";
import { Reveal } from "@/components/Reveal";
import { qrCodeDataUrl } from "@/lib/qrcode";
import { satisfactionFormAbsoluteUrl } from "@/lib/satisfaction";

export const metadata: Metadata = {
  title: "Ouvidoria",
  description:
    "Ouvidoria da Previdência do Iprevicon — o que é, para que serve, como acessar e Pesquisa de Satisfação.",
};

export const dynamic = "force-dynamic";

const ENDERECO = {
  linha1: "Rua Paulo de Barros Baía, 30, 4º andar",
  linha2: "Bairro Fonte Grande, Contagem - MG",
  cep: "CEP 32015-460",
  mapsQuery:
    "Rua Paulo de Barros Baía, 30, Fonte Grande, Contagem - MG, 32015-460",
};

const PUBLICO = [
  {
    title: "Servidores ativos",
    text: "Quem contribui ao RPPS e precisa de orientação, registro de manifestações ou esclarecimentos.",
  },
  {
    title: "Aposentados e pensionistas",
    text: "Quem recebe benefício e deseja avaliar o atendimento ou registrar elogios, sugestões e reclamações.",
  },
  {
    title: "Dependentes e representantes",
    text: "Quem acompanha interesses previdenciários de familiares ou representa o segurado.",
  },
  {
    title: "Cidadãos e controle social",
    text: "Qualquer pessoa que deseje se manifestar sobre a atuação do Instituto, com respeito e escuta.",
  },
];

export default async function OuvidoriaPage() {
  const ouvidoriaEmail =
    process.env.OUVIDORIA_EMAIL || "ouvidoria@iprevicon.contagem.mg.gov.br";

  const phone = (process.env.WHATSAPP_OUVIDORIA || "").replace(/\D/g, "");
  const waChat = phone ? `https://wa.me/${phone}` : "https://wa.me/";

  const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ENDERECO.mapsQuery)}`;
  const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ENDERECO.mapsQuery)}`;
  const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(ENDERECO.mapsQuery)}&hl=pt-BR&z=17&output=embed`;

  const formUrl = `${satisfactionFormAbsoluteUrl()}?src=link`;
  const formUrlQr = `${satisfactionFormAbsoluteUrl()}?src=qr`;
  const qrDataUrl = await qrCodeDataUrl(formUrlQr);

  return (
    <>
      <PageHero
        eyebrow="Ouvidoria"
        title="Ouvidoria da Previdência"
        description="Canal oficial de escuta do Iprevicon — acolher manifestações, orientar o cidadão e contribuir para a melhoria contínua do atendimento previdenciário."
        cta={{ href: "#acesso", label: "Como acessar" }}
      />

      {/* 1. O que é */}
      <section className="border-b border-primary/10">
        <div className="mx-auto max-w-[56rem] px-4 py-14 md:px-6 lg:py-16">
          <Reveal className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              O que é
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-primary lg:text-[1.75rem]">
              O que é a Ouvidoria da Previdência
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              A Ouvidoria da Previdência é o canal institucional do Iprevicon dedicado a ouvir
              servidores, aposentados, pensionistas e a sociedade. Atua com imparcialidade para
              receber manifestações, prestar orientações e encaminhar demandas aos setores
              responsáveis, sempre com foco no respeito e na melhoria do serviço público
              previdenciário.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-10 border-t border-primary/10 pt-12 md:grid-cols-2">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                Para que serve
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-primary lg:text-xl">
                Escuta, orientação e melhoria
              </h3>
              <ul className="mt-5 space-y-3 text-base leading-relaxed text-muted">
                <li>Registrar elogios, sugestões, reclamações e pedidos de informação.</li>
                <li>Orientar sobre caminhos e canais adequados no Instituto.</li>
                <li>Acompanhar encaminhamentos quando necessário.</li>
                <li>Apoiar a avaliação da qualidade do atendimento prestado.</li>
              </ul>
            </Reveal>
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                Compromisso
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-primary lg:text-xl">
                Ouvir. Acolher. Orientar. Melhorar.
              </h3>
              <p className="mt-5 text-base leading-relaxed text-muted">
                Sob a condução do Ouvidor da Previdência, o canal busca transformar a escuta em
                ação concreta — com linguagem clara, acolhimento e encaminhamentos cabíveis para
                cada situação.
              </p>
              <p className="mt-4 font-display text-base font-semibold text-primary">
                Dáliton Ribeiro de Araujo
              </p>
              <p className="text-sm font-medium uppercase tracking-[0.12em] text-muted">
                Ouvidor da Previdência – IPREVICON
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Público */}
      <section className="border-b border-primary/10 bg-cream-muted/50">
        <div className="mx-auto max-w-[56rem] px-4 py-14 md:px-6 lg:py-16">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Público-alvo
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-primary lg:text-[1.75rem]">
              Para quem a Ouvidoria existe
            </h2>
            <p className="mt-4 text-lg text-muted">
              O canal está aberto a todos que se relacionam com o Regime Próprio de Contagem.
            </p>
          </Reveal>
          <div className="stagger mt-10 grid gap-8 sm:grid-cols-2">
            {PUBLICO.map((item) => (
              <Reveal key={item.title}>
                <article className="border-t-[3px] border-accent pt-5">
                  <h3 className="font-display text-xl font-semibold text-primary">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Como acessar */}
      <section id="acesso" className="scroll-mt-28 border-b border-primary/10">
        <div className="mx-auto max-w-[56rem] px-4 py-14 md:px-6 lg:py-16">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Canais
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-primary lg:text-[1.75rem]">
              Como acessar a Ouvidoria
            </h2>
            <p className="mt-4 text-lg text-muted">
              Escolha o canal mais conveniente — digital ou presencial.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Reveal>
              <article className="flex h-full flex-col rounded-3xl border border-primary/10 bg-white px-5 py-6">
                <h3 className="font-display text-xl font-semibold text-primary">WhatsApp</h3>
                <p className="mt-2 flex-1 text-base leading-relaxed text-muted">
                  Fale diretamente com a Ouvidoria da Previdência pelo aplicativo.
                </p>
                <a
                  href={waChat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 w-fit items-center rounded-full bg-[#25D366] px-5 text-sm font-semibold text-white transition hover:brightness-95"
                >
                  Abrir WhatsApp
                </a>
              </article>
            </Reveal>

            <Reveal>
              <article className="flex h-full flex-col rounded-3xl border border-primary/10 bg-white px-5 py-6">
                <h3 className="font-display text-xl font-semibold text-primary">E-mail</h3>
                <p className="mt-2 flex-1 text-base leading-relaxed text-muted">
                  Envie sua manifestação por correio eletrônico à Ouvidoria.
                </p>
                <a
                  href={`mailto:${ouvidoriaEmail}`}
                  className="mt-5 inline-flex min-h-11 w-fit items-center rounded-full border-2 border-primary/20 bg-cream px-5 text-sm font-semibold text-primary transition hover:bg-white"
                >
                  {ouvidoriaEmail}
                </a>
              </article>
            </Reveal>

            <Reveal className="sm:col-span-2">
              <article className="rounded-3xl border border-primary/10 bg-white px-5 py-6 sm:px-6">
                <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-primary">
                      Atendimento presencial
                    </h3>
                    <address className="mt-4 not-italic text-base leading-relaxed text-muted">
                      {ENDERECO.linha1}
                      <br />
                      {ENDERECO.linha2}
                      <br />
                      {ENDERECO.cep}
                    </address>
                    <p className="mt-3 text-base text-muted">
                      Segunda a sexta, das 8h às 17h
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <a
                        href={mapsSearch}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center rounded-full border-2 border-primary/20 bg-cream px-5 text-sm font-semibold text-primary transition hover:bg-white"
                      >
                        Ver no mapa
                      </a>
                      <a
                        href={mapsDirections}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-cream transition hover:bg-secondary"
                      >
                        Traçar rota
                      </a>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-primary/10">
                    <iframe
                      title="Mapa — Ouvidoria IPREVICON"
                      src={mapsEmbed}
                      className="h-56 w-full border-0 sm:h-64"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. Satisfação */}
      <section id="satisfacao" className="scroll-mt-28 bg-cream-muted/40 py-14 lg:py-16">
        <div className="mx-auto max-w-[56rem] px-4 md:px-6">
          <Reveal className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Avaliação
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-primary lg:text-[1.75rem]">
              Pesquisa de Satisfação
            </h2>
            <p className="mt-4 text-lg text-muted">
              Encaminhe a pesquisa ao usuário por link, WhatsApp, e-mail ou QR Code. A avaliação
              abre em tela exclusiva e, após o envio, é registrada no sistema.
            </p>
          </Reveal>
          <OuvidoriaFormTools formUrl={formUrl} qrDataUrl={qrDataUrl} />
        </div>
      </section>

      <PageEndNav />
    </>
  );
}
