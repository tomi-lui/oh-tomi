"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Focus from "@/components/layout/Focus";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideFooterAndFocus =  pathname === "/works" || pathname === "/gallery";
  return (
    <>
      <Header />
      {children}
      {!hideFooterAndFocus && <Focus />}
      {!hideFooterAndFocus && <Footer />}
    </>
  );
}
