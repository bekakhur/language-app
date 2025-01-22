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
      <body className={`${oswald.className} antialiased mb-10`}>
        {children}
      </body>
    </html>
  );
}
