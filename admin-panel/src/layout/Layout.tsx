import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {Box, Container} from '@mui/material';
import Navbar from "../common/Navbar.tsx";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
            <Box display="flex" flexDirection="column" minHeight="100vh" >
                <Header/>
                <Navbar/>
                <Container
                    component="main"
                    sx={{
                        flex: 1,
                        marginTop: '2%',
                        px: '20px',
                        py: '20px',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        borderRadius: '20px',
                    }}
                >
                    {children}
                </Container>
                <Footer/>
            </Box>
    );
};

export default Layout;
