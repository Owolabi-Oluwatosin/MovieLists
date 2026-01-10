import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Nav from "../components/Nav";

const BASE_URL = "https://image.tmdb.org/t/p/w300";

export default function AfricanCinema({ featured }) {
  return (
    <>
      <Head>
        <title>African Cinema | Discover African Movies</title>
        <meta
          name="description"
          content="Discover African cinema including Nollywood, South African movies, and East African films. Updated regularly."
        />
        <meta
        name="description"
        content="Discover African and global movies, watch trailers, and find where to stream films legally on Netflix and Amazon Prime."
      />
      <link rel="icon" href="/logo.png" />

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
        content="https://hotmovielist.com/logo.png"
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
        content="https://hotmovielist.com/logo.png"
      />
      </Head>

      <Header />
      <Nav />

      <main className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl mb-4">African Cinema</h1>
        <p className="mb-8 text-lg opacity-80">
          Explore the best of African storytelling — from Nollywood blockbusters
          to award-winning South African cinema.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map(movie => (
            <Link key={movie.id} href={`/movie/${movie.id}`} passHref>
              <div className="cursor-pointer">
                {movie.poster_path && (
                  <Image
                    src={`${BASE_URL}${movie.poster_path}`}
                    width={300}
                    height={450}
                    alt={movie.title}
                  />
                )}
                <p className="mt-2">{movie.title}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 space-x-4">
          <Link href="/nollywood">
            <a className="underline">Nollywood Movies</a>
          </Link>
          <Link href="/south-african-movies">
            <a className="underline">South African Movies</a>
          </Link>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_origin_country=NG|ZA|KE|GH|EG&sort_by=popularity.desc`
  );
  const data = await res.json();

  return {
    props: {
      featured: data.results.slice(0, 20)
    },
    revalidate: 86400
  };
}
