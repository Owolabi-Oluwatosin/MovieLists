import React from "react";
import Thumbnail from "./Thumbnail";
import FlipMove from "react-flip-move";

function Results({ results }) {

    return (
        <div className="px-5 my-10 sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:flex flex-wrap">
            {results.results.map((result) => (
                <Thumbnail key={result.id} result={result} />
            ))}
        </div>
    )
}

export default Results;