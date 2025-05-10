import axios from 'axios'
import {useState} from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";

type ReadingRequest = {
    title: string;
    description: string;
    content: string;
    level: string;
};

function CreateReading() {

    const [formData, setFormData] = useState<ReadingRequest>({
        title: "defTitle",
        description: "defDescription",
        content: "defContent",
        level: "defLevel"
    });

    async function handleSubmit() {
        await axios.post(
            `http://localhost:8080/api/reading`,
            formData,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }
            }
        )
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const keyName = event.target.name;
        const value = event.target.value;

        setFormData({
            ...formData,
            [keyName]: value
        })
    }

    return (
        <Box component={"form"} onSubmit={handleSubmit}
             sx={{
                 display: "flex",
                 flexDirection: "column",
             }}
        >
            <FormControl>
                <FormLabel htmlFor={"title"}>title</FormLabel>
                <TextField
                    required
                    fullWidth
                    id="title"
                    name={"title"}
                    label="Standard"
                    variant="standard"
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor={"description"}>description</FormLabel>
                <TextField
                    fullWidth
                    id="description"
                    name={"description"}
                    onChange={handleChange}
                    label="Standard"
                    variant="standard"
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor={"content"}>content</FormLabel>
                <TextField
                    fullWidth
                    id="content"
                    name={"content"}
                    onChange={handleChange}
                    label="Standard"
                    variant="standard"
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor={"level"}>level</FormLabel>
                <TextField
                    required
                    fullWidth
                    id="level"
                    name={"level"}
                    label="Standard"
                    variant="standard"
                    onChange={handleChange}
                />
            </FormControl>


            <Button type={"submit"}>
                Submit
            </Button>
        </Box>
    )
}

export default CreateReading;