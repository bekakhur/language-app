import Head from "next/head";

export default function CinemaLayout({ children }) {
  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </Head>
      <div className="flex flex-col w-full bg-black portrait:bg-black landscape:bg-black min-h-screen">
        {children}
      </div>
    </>
  );
}
