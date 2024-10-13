import { Head, Html, Main, NextScript } from "next/document";

/** https://nextjs.org/docs/advanced-features/custom-document */
export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
