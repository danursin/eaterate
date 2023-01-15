import { Head, Html, Main, NextScript } from "next/document";

/** https://nextjs.org/docs/advanced-features/custom-document */
export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta name="description" content="Eaterate recipes for food-eaters" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
