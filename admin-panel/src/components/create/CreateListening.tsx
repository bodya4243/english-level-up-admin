import {useState} from "react";
import axios from 'axios'
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";

type ListeningRequest = {
    title: string,
    description: string,
    level: string,
    filePath: string
}

function CreateListening() {

    const [formData, setFormData] = useState<ListeningRequest>({
        title: "defTitle",
        description: "defDescritption",
        level: "A1",
        filePath: "defPath"
    })

    async function handleSubmit() {
        await axios.post(
            `http://localhost:8080/api/listening`,
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
        const {name, value} = event.target;

        setFormData({
                ...formData,
                [name]: value
            }
        )
    }

    return (
        <Box
            component={"form"}
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column"
            }}
        >
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
                <FormLabel htmlFor={"filePath"}>filePath</FormLabel>
                <TextField
                    fullWidth
                    id="filePath"
                    name={"filePath"}
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

export default CreateListening;