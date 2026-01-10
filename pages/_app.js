import '../styles/globals.css'
import Script from "next/script";
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Analytics */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
      />
      <Script
        id="ga4"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXX');
          `,
        }}
      />

      {/* Sticky footer layout */}
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default MyApp;
