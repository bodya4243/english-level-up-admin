import { jwtDecode } from 'jwt-decode';
import Panel from "../components/Panel.tsx";
import {Typography} from "@mui/material";
import SignIn from "./SignIn.tsx";

function RoleHandler() {
    const token: string | null = localStorage.getItem('token');

    function checkAuthorities(): boolean {
        if (!token) {
            console.error("No token found. Please log in again.");
            return false
        } else {
            const decodedToken: { roles?: string[] } = jwtDecode(token);
            if (decodedToken.roles?.includes('ROLE_ADMIN')) {
                return true;
            } else {
                localStorage.clear();
                return false;
            }
        }
    }

    return (
        <>
            {
                checkAuthorities() ? (
                    <Panel/>
                ) : (
                    <>
                        <Typography>
                            you are not authenticated or not admin.
                        </Typography>

                        <SignIn/>
                    </>
                )
            }
        </>
    )
}

export default RoleHandler;
