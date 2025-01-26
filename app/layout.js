import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Lato } from "next/font/google";

const oswald = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata = {
  title: "Grammaticus",
  description: "English grammar exercises and quizzes online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />

      <body
        className={`${oswald.className} bg-white antialiased mb-10 text-gray-950`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
