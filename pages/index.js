import Head from 'next/head';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Results from '../components/Results';
import styles from '../styles/Home.module.css';
import requests from '../utils/requests';
import AdBanner from '../components/AdBanner';

export default function Home({ results }) {
  //console.log(results)
  return (
    <div className={styles.container}>
      <Head>
      {/* BASIC */}
      <title>HotMovieList – Discover African & Global Movies</title>
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

      {/* Results */}
      <Results results={results} />
      <AdBanner slot="1111111111" />
    </div>
  )
}

export async function getServerSideProps(context) {
  const genre = context.query.genre;

  const request = await fetch(
    `https://api.themoviedb.org/3${requests[genre]?.url || requests.fetchTrending.url}`
  ).then(res => res.json());

  return {
    props: {
      results: request,
      revalidate: 1
    }
    
  }
}
