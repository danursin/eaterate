import "semantic-ui-css/semantic.min.css";

import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function App({ Component, pageProps }: AppProps) {
    const { user } = pageProps;
    return (
        <UserProvider user={user}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </UserProvider>
    );
}
