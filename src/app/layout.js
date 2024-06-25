import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"], // Include all available font weights
});

export const metadata = {
  title: "Taxi alert",
  description: "Taxi alert website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={kanit.className}>{children}</body>
    </html>
  );
}
