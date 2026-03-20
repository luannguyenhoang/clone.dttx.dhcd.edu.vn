import { TrackingSession } from "@/app/components/atoms/TrackingSession";
import "@/app/globals.css";

import { GET_HEADER_AND_FOOTER } from "@/app/api/graphQL/getHeaderAndFooter";
import { getClient } from "@/lib/apolloClient";
import { GoogleTagManager } from "@next/third-parties/google";
import { FixHead } from "./components/atoms/FixHead";
import { LayoutContent } from "./components/template/LayoutContent";

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID_DTTXDHCD;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  let headerFooterData = null;
  try {
    const { data } = await getClient().query({
      query: GET_HEADER_AND_FOOTER,
      fetchPolicy: "no-cache"
    });
    headerFooterData = data;
  } catch (error) {
    console.error("Error fetching header/footer data on server:", error);
  }

  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="HQo1tWo-oQVaxjFtRSF2bhr_pKurP_gWgAWG99Pmlzw"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <div className="max-w-[1920px] mx-auto">
          <FixHead />
          {gtmId && <GoogleTagManager gtmId={gtmId} />}
          <TrackingSession />
          <LayoutContent headerFooterData={headerFooterData}>
            {children}
          </LayoutContent>
        </div>
      </body>
    </html>
  );
}
