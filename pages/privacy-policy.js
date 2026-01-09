import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | HotMovieList</title>
      </Head>
      {/* Header */}
      <Header />

      {/* Nav */}
      <Nav />
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl mb-4">Privacy Policy</h1>
        <p>
          HotMovieList uses cookies and similar technologies to improve user
          experience and display relevant ads. Third-party vendors, including
          Google, use cookies to serve ads based on prior visits.
        </p>
        <p className="mt-4">
          Users may opt out of personalized advertising by visiting Google Ads
          Settings.
        </p>
      </main>
    </>
  );
}
