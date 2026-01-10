import React from "react";
import Thumbnail from "./Thumbnail";
import FlipMove from "react-flip-move";

function Results({ results }) {
    // Normalize data shape
    // console.log("results:", results)
    const movies = Array.isArray(results)
        ? results
        : results?.results || [];

    if (!movies.length) return null;
    return (
        <div className="px-5 my-10 sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:flex flex-wrap">
            {movies.map((result) => (
                <Thumbnail key={result.id} result={result} />
            ))}
        </div>
    )
}

export default Results;