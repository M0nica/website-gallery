import Head from "next/head";
const title = `Monica's Website Gallery`;
const url = `https://website-gallery.now.sh/`;
const description = `A collection of sites around the world wide web 🌏 that have inspired Monica Powell...`;
const Meta = (props) => (
  <Head>
    <title>{title}</title>
    <link rel="icon" href="/favicon.ico" />
    <meta name="description" content="" />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={title} />
    <meta
      name="og:description"
      property="og:description"
      content={description}
    />
    <meta property="og:site_name" content={title} />
    <meta property="og:url" content={url} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <link rel="icon" type="image/png" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/favicon.ico" />
    <meta property="og:image" content={`${url}app-screenshot.png`} />
    <meta name="twitter:image" content={`${url}app-screenshot.png`} />
    <link rel="canonical" href={url} />
    <script type="text/javascript" src=""></script>
  </Head>
);
export default Meta;
