import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact | HotMovieList</title>
        <meta
        name="description"
        content="Discover African and global movies, watch trailers, and find where to stream films legally on Netflix and Amazon Prime."
      />
      <link rel="icon" href="/logo.svg" />

      {/* OPEN GRAPH (Facebook, WhatsApp, Instagram) */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://hotmovielist.com/" />
      <meta property="og:title" content="HotMovieList – Discover African & Global Movies" />
      <meta
        property="og:description"
        content="Discover African and global movies, watch trailers, and find where to stream films legally."
      />
      <meta
        property="og:image"
        content="https://hotmovielist.com/logo-social.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* TWITTER / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://hotmovielist.com/" />
      <meta name="twitter:title" content="HotMovieList – Discover African & Global Movies" />
      <meta
        name="twitter:description"
        content="Discover African and global movies, watch trailers, and find where to stream films legally."
      />
      <meta
        name="twitter:image"
        content="https://hotmovielist.com/logo-social.png"
      />
      </Head>
      {/* Header */}
      <Header />

      {/* Nav */}
      <Nav />
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl mb-4">Contact</h1>
        <p>Email: support@hotmovielist.com</p>
      </main>
    </>
  );
}
