import { DefaultSeo, NextSeo } from "next-seo";

export default function SEO({
  title = "Quran ul Kareem",
  description = "A web platform for reciting the glorious Quran. Available in different language.",
  setDefault = false,
}: {
  title?: string;
  description?: string;
  setDefault?: boolean;
}) {
  return (
    <>
      {setDefault ? (
        <DefaultSeo
          title={title}
          openGraph={{
            title,
            description,
            locale: "en_IE",
            type: "website",
            site_name: "Quran ul Kareem",
            images: [
              {
                url: "/Quran.jpg",
                width: 800,
                height: 600,
                alt: "Al Quran",
                type: "image/jpg",
              },
            ],
          }}
        />
      ) : (
        <NextSeo
        title={title}
        openGraph={{
            title,
            description,
            locale: "en_IE",
            type: "website",
            site_name: "Quran ul Kareem",
            images: [
              {
                url: "/Quran.jpg",
                width: 800,
                height: 600,
                alt: "Al Quran",
                type: "image/jpg",
              },
            ],
          }}
        />
      )}
    </>
  );
}
