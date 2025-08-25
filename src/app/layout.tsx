import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { ReactLenis } from "lenis/react";

import { saans } from "@/fonts";
import { FooterProvider } from "@/contexts/footer-context";
import LoadingScreen from "@/components/layout/LoadingScreen";
import { InitialLoadProvider } from "@/contexts/initial-load-context";
import type { Metadata } from "next";
import LayoutClient from "./layout-client"; // 👈 new client wrapper

export const metadata: Metadata = {
  title: "OH BRO",
  description: "broo website showcasing my work",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en">
        <ReactLenis root>
          <InitialLoadProvider>
            <FooterProvider>
              <body
                className={`${saans.className} antialiased bg-neutral-900 text-neutral-900 `}
              >
                <LoadingScreen />
                <LayoutClient>{children}</LayoutClient>
              </body>
            </FooterProvider>
          </InitialLoadProvider>
        </ReactLenis>
      </html>
    </ViewTransitions>
  );
}
