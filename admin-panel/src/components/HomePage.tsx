import '../components/layout/Header.tsx'
import {Box} from "@mui/material";
import Feed from "../components/common/Feed.tsx";

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
            <Feed/>
        </Box>
    );
}

export default HomePage
