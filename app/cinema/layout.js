import Head from "next/head";

export default function CinemaLayout({ children }) {
  return (
    <div className="flex flex-col w-full bg-black min-h-screen">{children}</div>
  );
}
