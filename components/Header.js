import React, { useState } from "react";
import Image from "next/image";
import HeaderItem from "./HeaderItem";
import SearchModal from "./SearchModal";
import { useRouter } from "next/router";
import {
  BadgeCheckIcon,
  CollectionIcon,
  HomeIcon,
  LightningBoltIcon,
  SearchIcon,
  UserIcon,
} from "@heroicons/react/outline";

function Header() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="flex flex-col sm:flex-row m-5 justify-between items-center h-auto">
        <div className="flex flex-grow justify-evenly max-w-2xl">
          <HeaderItem title="HOME" Icon={HomeIcon} onClick={() => router.push("/")} />
          <HeaderItem title="TRENDING" Icon={LightningBoltIcon} onClick={() => router.push("/?genre=fetchTrending")} />
          <HeaderItem title="VERIFIED" Icon={BadgeCheckIcon} onClick={() => router.push("/african-cinema")} />
          <HeaderItem title="COLLECTIONS" Icon={CollectionIcon} onClick={() => router.push("/nollywood")} />

          {/* SEARCH */}
          <HeaderItem
            title="SEARCH"
            Icon={SearchIcon}
            onClick={() => setIsSearchOpen(true)}
          />

          <HeaderItem title="ACCOUNT" Icon={UserIcon} />
        </div>

        <Image
          className="object-contain cursor-pointer"
          src="/logo.svg"
          alt="movielists logo"
          width={200}
          height={100}
          onClick={() => router.push("/")}
        />
      </header>

      {/* SEARCH MODAL */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

export default Header;


// import React from "react";
// import Image from "next/image";
// import HeaderItem from "./HeaderItem";
// import {
//   BadgeCheckIcon,
//   CollectionIcon,
//   HomeIcon,
//   LightningBoltIcon,
//   SearchIcon,
//   UserIcon,
// } from "@heroicons/react/outline";

// function Header() {
//   return (
//     <header className="flex flex-col sm:flex-row m-5 justify-between items-center h-auto">
//       <div className="flex flex-grow justify-evenly max-w-2xl">
//         <HeaderItem title="HOME" Icon={HomeIcon} />
//         <HeaderItem title="TRENDING" Icon={LightningBoltIcon} />
//         <HeaderItem title="VERIFIED" Icon={BadgeCheckIcon} />
//         <HeaderItem title="COLLECTIONS" Icon={CollectionIcon} />
//         <HeaderItem title="SEARCH" Icon={SearchIcon} />
//         <HeaderItem title="ACCOUNT" Icon={UserIcon} />
//       </div>
//       <Image className="object-contain" src="/logo.svg" alt="movielists logo" width={200} height={100} />
//     </header>
//   )
// }

// export default Header;