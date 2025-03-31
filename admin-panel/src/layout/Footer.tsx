import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                color: 'black',
                py: 2,
                textAlign: 'center',
            }}
        >
            <Typography variant="body2">
                &copy; {new Date().getFullYear()} My Application. All rights reserved.
            </Typography>
            <Typography variant="body2">
                <Link href="/privacy" color="inherit">
                    Privacy Policy
                </Link>
            </Typography>
        </Box>
    );
};

export default Footer;
