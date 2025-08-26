import Link from "next/link";
import React from "react";

const Navigation = () => {
  return (
    <header className="flex items-center justify-between w-full">
      <div>Logo</div>
      <ul className="list-style-none flex">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/blogs">Blogs</Link>
        </li>
        <li>
          <Link href="/service">Services</Link>
        </li>
      </ul>
    </header>
  );
};

export default Navigation;
