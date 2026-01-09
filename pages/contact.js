import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact | HotMovieList</title>
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
