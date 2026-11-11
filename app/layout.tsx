import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./common.css";
import "./home.css";
import StoreProvider from "@/components/StoreProvider";

export const metadata: Metadata = { title: "Books for All" };
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/* applies the saved page colour before first paint (no flash) */
const themeBoot = `try{var h=localStorage.getItem('bfa-bg');if(/^#[0-9a-f]{6}$/i.test(h||'')){var r=document.documentElement,n=parseInt(h.slice(1),16),c=[n>>16&255,n>>8&255,n&255].map(function(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}),l=.2126*c[0]+.7152*c[1]+.0722*c[2],a=(n>>16&255)-244,b=(n>>8&255)-124,d=(n&255)-44;r.style.setProperty('--bg',h);if(l<.18)r.classList.add('dk');if(Math.sqrt(a*a+b*b+d*d)<90)r.style.setProperty('--orange','#1c4fa0')}}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
