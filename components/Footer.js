import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0b1120] border-t border-gray-800 mt-16 absolute bottom-0">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">

        {/* BRAND */}
        <div>
          <h3 className="text-lg font-bold mb-3">HotMovieList</h3>
          <p className="opacity-70 leading-relaxed">
            Discover African and global movies, watch trailers, and find where
            to stream films legally on platforms like Netflix and Amazon Prime.
          </p>
        </div>

        {/* DISCOVER */}
        <div>
          <h4 className="font-semibold mb-3">Discover</h4>
          <ul className="space-y-2 opacity-80">
            <li>
              <Link href="/african-cinema">African Cinema</Link>
            </li>
            <li>
              <Link href="/nollywood">Nollywood</Link>
            </li>
            <li>
              <Link href="/">Trending Movies</Link>
            </li>
            <li>
              <Link href="/search">Search</Link>
            </li>
          </ul>
        </div>

        {/* LEGAL (ADSENSE REQUIRED) */}
        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 opacity-80">
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* DISCLAIMER */}
        <div>
          <h4 className="font-semibold mb-3">Disclaimer</h4>
          <p className="opacity-70 leading-relaxed">
            HotMovieList does not host or stream movies. We provide information
            and redirect users to legal streaming platforms.
          </p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800 py-4 text-center text-xs opacity-60">
        © {new Date().getFullYear()} HotMovieList. All rights reserved.
      </div>
    </footer>
  );
}
