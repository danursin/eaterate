import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";

import { Grid, Menu, MenuItem } from "semantic-ui-react";

import Link from "next/link";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
    title: "Eaterate",
    description: "Eat and Iterate with Eaterate"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Menu>
                    <MenuItem icon="food" header as={Link} href="/" content="Eaterate" />
                </Menu>
                <Grid padded="horizontally">
                    <Grid.Row>
                        <Grid.Column>{children}</Grid.Column>
                    </Grid.Row>
                </Grid>
                <ToastContainer />
            </body>
        </html>
    );
}
