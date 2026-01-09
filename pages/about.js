import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About | HotMovieList</title>
      </Head>
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl mb-4">About HotMovieList</h1>
        <p>
          HotMovieList helps users discover African and global movies, see
          trailers, and find where to watch legally on streaming platforms.
        </p>
      </main>
    </>
  );
}
