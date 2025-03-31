import {Box} from "@mui/material";
import RoleHandler from "../authentication/RoleHandler.tsx";

function HomePage() {

    return (
        <Box
            sx={{
                marginTop: '5%',
                marginBottom: '5%',
                display: 'flex',
                flexDirection: 'column',
                gap: '50px',
            }}>
            <RoleHandler/>
        </Box>
    );
}

export default HomePage
