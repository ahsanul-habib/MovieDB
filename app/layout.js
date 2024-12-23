import localFont from "next/font/local";
import "@/app/globals.css";
import AuthProvider from "@/providers/AuthProvider";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "MovieDB App",
  description: "A site to get movie details",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased`}
      >
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
        <ToastContainer autoClose={2000} />
      </body>
    </html>
  );
}
