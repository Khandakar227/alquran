import Head from 'next/head';

export default function SEO ({
  title="Al Quran",
  description="A web platform for reciting the glorious Quran. Available in different language.",
}:{
  title?:string;
  description?:string;
}) {
  return (
    <Head>
      <title key="title">{title}</title>
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:description" key="og:description" content={description} />
      <meta property="description" key="description" content={description} />
      <meta property="og:image" content="/Quran_Kareem.png" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    </Head>
    )
}