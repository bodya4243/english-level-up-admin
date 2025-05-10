import {Box} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import axios from 'axios'
import {useState} from "react";
import Button from "@mui/material/Button";

type EssayRequest = {
    level: string;
    title: string;
};

function CreateWriting() {

    const [formData, setFromData] = useState<EssayRequest>({
        level: 'A1',
        title: 'defaultTitle'
    });

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        await axios.post(
            `http://localhost:8080/api/essay`,
            formData,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }
            }
        );
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        const {name, value} = event.target;

        setFromData({
            ...formData,
            [name]: value
        })
    }

    return (
        <Box
            component={"form"}
            onSubmit={(e) => handleSubmit(e)}
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <FormControl>
                <FormLabel htmlFor={"level"}>level</FormLabel>
                <TextField
                    required
                    fullWidth
                    id="level"
                    name={"level"}
                    onChange={handleChange}
                    label="Standard"
                    variant="standard"
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor={"title"}>title</FormLabel>
                <TextField
                    fullWidth
                    id="title"
                    name={"title"}
                    onChange={handleChange}
                    label="Standard"
                    variant="standard"
                />
            </FormControl>

            <Button type={"submit"}>
                Submit
            </Button>
        </Box>
    )
}

export default CreateWriting;