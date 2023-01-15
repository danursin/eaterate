import { Grid, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import React, { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    return (
        <Grid columns={1}>
            <Grid.Column style={{ paddingBottom: 0 }}>
                <Menu tabular>
                    <Menu.Menu position="left">
                        <Menu.Item content="Eaterate" icon="bars" onClick={() => setSidebarOpen(true)} link />
                    </Menu.Menu>

                    <Menu.Menu position="right">
                        <Menu.Item content="Sign in" icon="sign in" link />
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
                        <Menu.Item as="a">
                            <Icon name="home" />
                            Home
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
    );
};

export default Layout;
