import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from '../components/Header';
import Nav from '../components/Nav';

const BASE_URL = "https://image.tmdb.org/t/p/w300";

export default function SearchPage({ query, results }) {
  return (
    <>
      {/* SEO META */}
      <Head>
        <title>Search results for "{query}" | MovieList</title>
        <meta
          name="description"
          content={`Search results for ${query} on MovieList`}
        />
      </Head>

      {/* Header */}
      <Header />

      {/* Nav */}
      <Nav />

      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-3xl mb-6">
          Results for "{query}"
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {results.map(item => (
            <Link key={item.id} href={`/movie/${item.id}`} passHref>
              <div className="cursor-pointer">
                {item.poster_path && (
                  <Image
                    src={`${BASE_URL}${item.poster_path}`}
                    width={300}
                    height={450}
                    alt={item.title || item.name}
                  />
                )}
                <p className="mt-2">
                  {item.title || item.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const q = query.q || "";

  if (!q) {
    return { props: { query: "", results: [] } };
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&query=${encodeURIComponent(
      q
    )}`
  );

  const data = await res.json();

  return {
    props: {
      query: q,
      results: data.results || []
    }
  };
}
