import { AppBar, Toolbar, styled, Typography, Box, Divider, Link } from '@mui/material';
import {useEffect, useState} from "react";
import axios from 'axios'
import {Levels} from "../../utils/Level.ts";

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
});

interface ResponseData {
    level: string;
}

function Header() {
    const [engLevel, setEngLevel] = useState<Levels | null>(null);

    const fetchLevel = async () => {
        const response = await axios.get<ResponseData>(
            `http://localhost:8080/api/level`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }
            }
        );
        const level = response.data.level as Levels;
        setEngLevel(level);
    }

    useEffect(() => {
        fetchLevel()
    }, []);

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
                        EngLevelUp
                    </Typography>

                    <Box sx={{ display: "flex", padding: "16px", gap: "15px" }}>
                        <Box display="flex" paddingRight="50px">
                            <Typography
                                variant="body1"
                                sx={{
                                    color: "#4A4A4A",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                }}
                            >
                                Level: {engLevel || "Not Set"}
                            </Typography>
                        </Box>

                        <Typography
                            variant="body1"
                            sx={{
                                color: "#4A4A4A",
                                cursor: "pointer",
                            }}
                        >
                            <Link href="/login">Log in</Link>
                        </Typography>

                        <Divider orientation="vertical" flexItem sx={{ backgroundColor: "#4A4A4A" }} />

                        <Typography
                            variant="body1"
                            sx={{
                                color: "#4A4A4A",
                                cursor: "pointer",
                            }}
                        >
                            <Link href="/sign-up">Register</Link>
                        </Typography>
                    </Box>
                </StyledToolbar>
            </AppBar>
        </div>
    );
}

export default Header;