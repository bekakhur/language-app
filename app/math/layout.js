import Head from "next/head";

export default function MathLayout({ children }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="theme-color" content="#FFEB3B" />
      </Head>
      <div className="flex flex-col w-full bg-yellow-500 portrait:bg-yellow-500 landscape:bg-yellow-500 min-h-screen">
        {children}
      </div>
    </>
  );
}
