import { Exo, Open_Sans as FontSans } from "next/font/google";

export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const fontExo = Exo({
    variable: "--font-exo",
    subsets: ["latin"],
    weight: "400",
});
