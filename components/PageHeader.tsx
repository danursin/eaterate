import { Header, SemanticICONS } from "semantic-ui-react";

import React from "react";

interface PageHeaderProps {
    title: string;
    icon?: SemanticICONS;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, icon }) => {
    return (
        <>
            <Header content={title} icon={icon} dividing />
        </>
    );
};

export default PageHeader;
