import { SatisfactionSurveyForm } from "@/components/SatisfactionSurveyForm";

type Props = { searchParams: Promise<{ src?: string }> };

export default async function PesquisaSatisfacaoPage({ searchParams }: Props) {
  const { src } = await searchParams;
  const source =
    src === "qr"
      ? "qr"
      : src === "whatsapp"
        ? "whatsapp"
        : src === "email"
          ? "email"
          : src === "link"
            ? "link"
            : "mobile";

  return <SatisfactionSurveyForm source={source} />;
}
