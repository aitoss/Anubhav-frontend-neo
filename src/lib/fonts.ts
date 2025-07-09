
import { Geist_Mono, Inter } from "next/font/google";

const inter = Inter({
	axes: ["opsz"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-inter",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export {
  geistMono, inter
};
