import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="w-full h-16 sm:h-20 border-b px-6 sm:px-10 flex justify-between items-center">
      <Link href="/">LOGO</Link>
      <Link href="account">ACCOUNT</Link>
    </div>
  );
};

export default Header;
