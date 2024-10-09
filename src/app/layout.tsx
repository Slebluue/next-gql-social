import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import StyledComponentsRegistry from '@/lib/registry'
import Provider from "@/lib/apolloProvider"

import Navigation from "@/components/navigation";
import { Container, PageContainer } from "@/components/ui/layout"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CouchSurfing Take Home",
  description: "Take home assignment for CouchSurfing interview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider>
          <StyledComponentsRegistry>
            <Navigation />
            <Container>
              <PageContainer>
                {children}
              </PageContainer>
            </Container>
          </StyledComponentsRegistry>
        </Provider>
      </body>
    </html>
  );
}
