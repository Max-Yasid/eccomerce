import Head from 'next/head';
import React from 'react';
import Header from './Layout/header';

function Layout({ children }) {
    return (
        <React.Fragment>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;700&display=swap" as="font" rel="stylesheet" />
            </Head>
            <Header />
            {children}
        </React.Fragment>
    );
}

export default Layout;