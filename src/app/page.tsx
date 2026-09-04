import {
  AboutStrip,
  HomeHero,
  NewsPreview,
  QuickAccess,
  ServicesPreview,
  loadHomeData,
} from "@/components/HomeSections";

export const revalidate = 300;

export default function HomePage() {
  const { news, services } = loadHomeData();

  return (
    <>
      <HomeHero />
      <QuickAccess />
      <ServicesPreview services={services} />
      <NewsPreview news={news} />
      <AboutStrip />
    </>
  );
}
