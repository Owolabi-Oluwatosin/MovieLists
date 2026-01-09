import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from '../../components/Header';
import Nav from '../../components/Nav';



const BASE_URL = "https://image.tmdb.org/t/p/original/";

export default function MovieDetail({
  movie,
  trailerKey,
  tmdbProviders,
  cast,
  similar
}) {

  const [jwProviders, setJwProviders] = useState([]);

  useEffect(() => {
    fetch(`/api/justwatch?title=${encodeURIComponent(movie.title)}`)
      .then(res => res.json())
      .then(data => setJwProviders(data.providers || []));
  }, [movie.title]);

  const finalProviders = jwProviders.length ? jwProviders : tmdbProviders;
  return (
    <>
      {/* SEO META */}
      <Head>
        <title>{movie.title} | MovieList</title>
        <meta name="description" content={movie.overview} />
        <meta property="og:title" content={movie.title} />
        <meta property="og:description" content={movie.overview} />
        <meta
          property="og:image"
          content={`${BASE_URL}${movie.backdrop_path || movie.poster_path}`}
        />
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Movie",
            "name": movie.title,
            "image": `https://image.tmdb.org/t/p/original${movie.poster_path}`,
            "description": movie.overview,
            "datePublished": movie.release_date,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": movie.vote_average,
              "ratingCount": movie.vote_count
            }
          })
        }}
      />
      </Head>

      {/* Header */}
      <Header />

      {/* Nav */}
      <Nav />
      <div className="max-w-6xl mx-auto p-8">
        
        {/* MOVIE HEADER */}
        <div className="flex flex-col md:flex-row gap-10">
          <Image
            src={`${BASE_URL}${movie.poster_path}`}
            width={500}
            height={600}
            alt={movie.title}
          />

          <div>
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <p className="mb-4">{movie.overview}</p>
            <p>⭐ {movie.vote_average} | {movie.release_date}</p>

            {/* STREAMING BUTTONS */}
            <div className="mt-6">
              <h2 className="text-xl mb-2">Where to Watch</h2>

              {finalProviders.length ? (
                finalProviders.map(p => (
                  <a
                    key={p.provider_id}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mr-3 mb-2 px-4 py-2 rounded bg-red-600"
                  >
                    Watch on {p.provider_name}
                  </a>
                ))
              ) : (
                <p>Not available for streaming in your region.</p>
              )}
            </div>
          </div>
        </div>

        {/* TRAILER */}
        {trailerKey ? (
          <div className="mt-12">
            <h2 className="text-2xl mb-4">Trailer</h2>
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          <p className="mt-10 italic">No official trailer available.</p>
        )}

        {/* CAST */}
        <div className="mt-6">
          <h2 className="text-2xl mb-4">Cast</h2>
          <div className="grid grid-cols-2 md:grid-cols-10 gap-4">
            {cast && cast.map(person => (
              <div key={person.id}>
                {person.profile_path && (
                  <Image
                    src={`${BASE_URL}${person.profile_path}`}
                    width={60}
                    height={60}
                    alt={person.name}
                    className="rounded-full"
                  />
                )}
                <p className="font-bold">{person.name}</p>
                <p className="text-sm">{person.character}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SIMILAR MOVIES */}
        <div className="mt-12">
          <h2 className="text-2xl mb-4">Similar Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {similar && similar.map(m => (
              <Link key={m.id} href={`/movie/${m.id}`} passHref>
                <div className="cursor-pointer">
                  <Image
                    src={`${BASE_URL}${m.poster_path}`}
                    width={300}
                    height={400}
                    alt={m.title}
                  />
                  <p className="mt-2">{m.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],          // we are not prebuilding any movie pages
    fallback: "blocking" // build page on first request
  };
}

/**
 * API REQUEST TO TMDB, JustWatch, Amazon Prime, Netflix
 * Get and Return
 */
export async function getStaticProps({ params }) {
  const TMDB_KEY = process.env.API_KEY;

  // TMDB: movie, videos, credits, similar
  const movieRes = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=${TMDB_KEY}&append_to_response=videos,credits,similar`
  );
  const movie = await movieRes.json();

  // Trailer fallback
  const trailer =
    movie.videos?.results.find(v => v.type === "Trailer" && v.site === "YouTube") ||
    movie.videos?.results.find(v => v.site === "YouTube") ||
    null;

  // Cast
  const cast = movie.credits?.cast?.slice(0, 10) || [];

  // Similar
  const similar = movie.similar?.results?.slice(0, 8) || [];

  // TMDB WATCH PROVIDERS (Fallback – Official)
  const providersRes = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}/watch/providers?api_key=${TMDB_KEY}`
  );
  const providersData = await providersRes.json();

  const tmdbProviders =
    providersData?.results?.NG?.flatrate
      ?.filter(p =>
        ["Netflix", "Amazon Prime Video"].includes(p.provider_name)
      )
      ?.map(p => ({
        provider_name: p.provider_name,
        url: `https://www.themoviedb.org/movie/${movie.id}/watch`
      })) || [];

  return {
    props: {
      movie,
      trailerKey: trailer?.key || null,
      cast,
      similar,
      tmdbProviders
    },
    revalidate: 86400 // 🔁 once per day
  };
}


// export async function getServerSideProps({ params }) {
//   const TMDB_KEY = process.env.API_KEY;

//   // TMDB: movie, videos, credits, similar
//   const movieRes = await fetch(
//     `https://api.themoviedb.org/3/movie/${params.id}?api_key=${TMDB_KEY}&append_to_response=videos,credits,similar`
//   );

//   const movie = await movieRes.json();

//   // Trailer fallback logic
//   const trailer =
//     movie.videos?.results.find(v => v.type === "Trailer" && v.site === "YouTube") ||
//     movie.videos?.results.find(v => v.type === "Teaser" && v.site === "YouTube") ||
//     movie.videos?.results.find(v => v.site === "YouTube") ||
//     null;

//   // Cast (top 10)
//   const cast = movie.credits?.cast?.slice(0, 10) || [];

//   // Similar movies
//   const similar = movie.similar?.results?.slice(0, 8) || [];

//   // JustWatch (SAFE parsing)
//   let providers = [];

//   try {
//     const jwRes = await fetch(
//       "https://apis.justwatch.com/content/titles/en_NG/popular",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "User-Agent": "Mozilla/5.0"
//         },
//         body: JSON.stringify({
//           query: movie.title,
//           page_size: 1,
//           page: 1
//         })
//       }
//     );

//     const text = await jwRes.text(); // IMPORTANT

//     // Only parse if response is valid JSON
//     if (text && text.trim().startsWith("{")) {
//       const jwData = JSON.parse(text);

//       providers =
//         jwData?.items?.[0]?.offers
//           ?.filter(o => ["nfx", "prv"].includes(o.package_short_name))
//           ?.map(o => ({
//             provider_id: o.provider_id,
//             provider_name:
//               o.package_short_name === "nfx"
//                 ? "Netflix"
//                 : "Amazon Prime Video",
//             url: o.urls?.standard_web
//           })) || [];
//     }
//   } catch (error) {
//     console.error("JustWatch fetch failed:", error);
//   }

//   // Return props safely
//   return {
//     props: {
//       movie,
//       trailerKey: trailer?.key || null,
//       providers,
//       cast,
//       similar
//     }
//   };
// }

