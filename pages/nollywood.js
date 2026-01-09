import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Nav from "../components/Nav";

const BASE_URL = "https://image.tmdb.org/t/p/w300";

export default function Nollywood({ movies }) {
  return (
    <>
      <Head>
        <title>Nollywood Movies | Nigerian Films</title>
        <meta
          name="description"
          content="Browse popular Nollywood movies and discover where to watch Nigerian films legally."
        />
      </Head>

      <Header />
      <Nav />

      <main className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl mb-6">Nollywood Movies</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {movies.map(movie => (
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
      </main>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_origin_country=NG&sort_by=popularity.desc`
  );
  const data = await res.json();

  return {
    props: {
      movies: data.results
    },
    revalidate: 86400
  };
}
