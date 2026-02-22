import "./globals.css";

export const metadata = {
  title: "Aegis Dashboard",
  description: "Polymarket Trading & BOTCOIN Mining Intelligence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
