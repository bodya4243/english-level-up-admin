import {Box, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {createRequest} from "./Requests.ts";
import axios from 'axios'
import {useEffect} from "react";
import {useLocation} from "react-router-dom";

function testCreateEntity() {
    const location = useLocation();
    const requestOption = location.state;

    const objReqType = createRequest(requestOption);

    const endpointMap: Map<string, string> = new Map([
        ["writing", "essay"],
        ["reading", "reading"]
    ]);

    const handleSave = async () => {
        await axios.post(
            `http://localhost:8080/api/${endpointMap.get(requestOption)}`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }
            }
        );
    };

    useEffect(() => {
        console.log("navigated to the testCreateEntity")
        console.log("propsTopic: " + requestOption)
    }, []);

    return (
        <Box>
            {
                Object.entries(objReqType).map(([key, value]) => (
                    <Box key={key}>
                        {Array.isArray(value) ? ( // Якщо value - масив
                            value.map((item, index) => (
                                <Box key={index}>
                                    {Object.entries(item).map(([subKey, subValue]) => (
                                        <Typography key={subKey}>
                                            {`${subKey}: ${subValue}`}
                                        </Typography>
                                    ))}
                                </Box>
                            ))
                        ) : (
                            <Typography>{`${key}: ${value}`}</Typography>
                        )}
                    </Box>
                ))
            }

            <Button onClick={handleSave}>Create {requestOption}</Button>
        </Box>
    );
}

export default testCreateEntity;
