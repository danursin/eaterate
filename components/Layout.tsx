import { Grid, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import React, { useState } from "react";

import Head from "next/head";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    return (
        <>
            <Head>
                <meta name="description" content="Eaterate recipes for food-eaters" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Grid columns={1}>
                <Grid.Column style={{ paddingBottom: 0 }}>
                    <Menu tabular>
                        <Menu.Menu position="left">
                            <Menu.Item content="Eaterate" icon="bars" onClick={() => setSidebarOpen(true)} link />
                        </Menu.Menu>
                    </Menu>
                </Grid.Column>
                <Grid.Column style={{ paddingTop: 0 }}>
                    <Sidebar.Pushable as={Segment}>
                        <Sidebar
                            as={Menu}
                            animation="overlay"
                            icon="labeled"
                            onHide={() => setSidebarOpen(false)}
                            vertical
                            visible={sidebarOpen}
                            width="thin"
                        >
                            <Menu.Item as={Link} href="/">
                                <Icon name="home" />
                                My Recipes
                            </Menu.Item>
                            <Menu.Item as={Link} href="/recipe">
                                <Icon name="plus circle" />
                                New Recipe
                            </Menu.Item>
                            <Menu.Item as={Link} href="/ingredient">
                                <Icon name="database" />
                                Ingredients
                            </Menu.Item>
                        </Sidebar>

                        <Sidebar.Pusher>
                            <Segment basic style={{ height: "100vh" }}>
                                {children}
                            </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </Grid.Column>
            </Grid>
        </>
    );
};

export default Layout;
