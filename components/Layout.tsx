import { Grid, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import React, { useState } from "react";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const { user } = useUser();
    return (
        <Grid columns={1}>
            <Grid.Column style={{ paddingBottom: 0 }}>
                <Menu tabular>
                    <Menu.Menu position="left">
                        <Menu.Item content="Eaterate" icon="bars" onClick={() => setSidebarOpen(true)} link />
                    </Menu.Menu>

                    <Menu.Menu position="right">
                        {!user && <Menu.Item content="Sign in" icon="sign in" link as="a" href="/api/auth/login" />}
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
                        {!!user && <Menu.Item content="Sign out" icon="sign out" link as="a" href="/api/auth/logout" />}
                    </Sidebar>

                    <Sidebar.Pusher>
                        <Segment basic style={{ height: "100vh" }}>
                            {children}
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Grid.Column>
        </Grid>
    );
};

export default Layout;
