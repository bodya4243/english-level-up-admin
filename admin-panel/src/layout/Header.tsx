import { AppBar, Toolbar, styled, Typography } from '@mui/material';

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
});

function Header() {
    return (
        <div>
            <AppBar position='static' sx={{ backgroundColor: '#C2ED91' }}>
                <StyledToolbar>
                    <Typography
                        variant="h6"
                        component="span"
                        sx={{
                            color: "#4A4A4A",
                            fontWeight: "bold",
                            letterSpacing: "0.5px",
                            textTransform: "uppercase",
                        }}
                    >
                        EngLevelUp Admin Panel
                    </Typography>
                </StyledToolbar>
            </AppBar>
        </div>
    );
}

export default Header;