import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useDebounce from "../hooks/useDebounce";

const BASE_URL = "https://image.tmdb.org/t/p/w200";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);
  const [results, setResults] = useState([]);
  const [recent, setRecent] = useState([]);

  // Load recent searches
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    setRecent(stored);
  }, []);

  // ESC to close
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Debounced search
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    const fetchSearch = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${encodeURIComponent(
          debouncedQuery
        )}`
      );
      const data = await res.json();
      setResults(data.results || []);
    };

    fetchSearch();
  }, [debouncedQuery]);

  const saveRecent = (q) => {
    const updated = [q, ...recent.filter(r => r !== q)].slice(0, 5);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setRecent(updated);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-[#0f172a] w-full max-w-2xl rounded-lg p-6 z-10">
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies or TV shows..."
          className="w-full px-4 py-3 mb-4 rounded bg-gray-800 outline-none"
        />

        {/* RECENT SEARCHES */}
        {!query && recent.length > 0 && (
          <div className="mb-4">
            <p className="text-sm opacity-70 mb-2">Recent searches</p>
            <div className="flex gap-2 flex-wrap">
              {recent.map(r => (
                <button
                  key={r}
                  onClick={() => setQuery(r)}
                  className="px-3 py-1 bg-gray-700 rounded text-sm"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULTS */}
        <div className="max-h-96 overflow-y-auto space-y-3">
          {results.map(item => (
            <Link
              key={`${item.media_type}-${item.id}`}
              href={`/movie/${item.id}`}
              onClick={() => {
                saveRecent(query);
                onClose();
              }}
              passHref
            >
              <div className="flex gap-4 items-center cursor-pointer hover:bg-gray-800 p-2 rounded">
                {item.poster_path && (
                  <Image
                    src={`${BASE_URL}${item.poster_path}`}
                    width={50}
                    height={75}
                    alt={item.title || item.name}
                  />
                )}
                <div>
                  <p className="font-bold">
                    {item.title || item.name}
                  </p>
                  <p className="text-sm opacity-70">
                    {item.media_type?.toUpperCase()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            className="block mt-4 text-center text-sm underline"
            passHref
          >
            View all results →
          </Link>

        </div>

        <button
          onClick={onClose}
          className="w-[40px] h-[40px] absolute bg-red-400 rounded-full top-3 right-3 text-xl"
        >
          ✕
        </button>
      </div>
    </div>
  );
}



// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// const BASE_URL = "https://image.tmdb.org/t/p/w200";

// export default function SearchModal({ isOpen, onClose }) {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);

//   if (!isOpen) return null;

//   const searchMovies = async (e) => {
//     e.preventDefault();
//     if (!query.trim()) return;

//     const res = await fetch(
//       `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${encodeURIComponent(
//         query
//       )}`
//     );

//     const data = await res.json();
//     setResults(data.results || []);
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
//       {/* BACKDROP */}
//       <div
//         className="absolute inset-0"
//         onClick={onClose}
//       />

//       {/* MODAL */}
//       <div className="relative bg-[#0f172a] w-full max-w-2xl rounded-lg p-6 z-10">
//         <h2 className="text-2xl mb-4">Search Movies</h2>

//         <form onSubmit={searchMovies} className="flex gap-2 mb-4">
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search for a movie..."
//             className="flex-1 px-4 py-2 rounded bg-gray-800 outline-none"
//           />
//           <button className="px-4 py-2 bg-red-600 rounded">
//             Search
//           </button>
//         </form>

//         {/* RESULTS */}
//         <div className="max-h-96 overflow-y-auto space-y-3">
//           {results.map(movie => (
//             <Link
//               key={movie.id}
//               href={`/movie/${movie.id}`}
//               onClick={onClose}
//               passHref
//             >
//               <div className="flex gap-4 items-center cursor-pointer hover:bg-gray-800 p-2 rounded">
//                 {movie.poster_path && (
//                   <Image
//                     src={`${BASE_URL}${movie.poster_path}`}
//                     width={50}
//                     height={75}
//                     alt={movie.title}
//                   />
//                 )}
//                 <div>
//                   <p className="font-bold">{movie.title}</p>
//                   <p className="text-sm opacity-70">
//                     {movie.release_date}
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           ))}

//           {!results.length && query && (
//             <p className="opacity-70">No results found.</p>
//           )}
//         </div>

//         {/* CLOSE BUTTON */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-xl"
//         >
//           ✕
//         </button>
//       </div>
//     </div>
//   );
// }
