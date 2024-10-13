import "semantic-ui-css/semantic.min.css";

import type { AppProps } from "next/app";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
    const { user } = pageProps;
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
