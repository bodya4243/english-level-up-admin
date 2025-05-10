import React, {useState} from "react";
import axios from 'axios'
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import {Box, Typography} from "@mui/material";
import Button from "@mui/material/Button";

type GrammarCardContent = {
    title: string;
    description: string;
    content: string;
}

type GrammarRequest = {
    level: string;
    title: string;
    description: string;
    content: GrammarCardContent[];
}

function CreateGrammar() {

    const [formData, setFormData] = useState<GrammarRequest>({
        level: "A1",
        title: "defTitle",
        description: "defDescription",
        content: [{
            title: "subTitle",
            description: "subDescription",
            content: "subContent"
        }]
    })

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    function handleContentChange(index: number, fieldType: keyof GrammarCardContent, value: string) {
        const newContent = [...formData.content];
        newContent[index] = {
            ...newContent[index],
            [fieldType]: value
        };

        setFormData({
            ...formData,
            content: newContent
        });
    }

    async function handleSubmit() {
        await axios.post(
            `http://localhost:8080/api/grammar-card`,
            formData,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }
            }
        )
    }

    return (
        <Box component={"form"} onSubmit={handleSubmit}>
            <FormControl>
                <FormLabel htmlFor={"level"}>level</FormLabel>
                <TextField
                    required
                    fullWidth
                    id="level"
                    name={"level"}
                    label="Standard"
                    variant="standard"
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor={"title"}>title</FormLabel>
                <TextField
                    required
                    fullWidth
                    id="title"
                    name={"title"}
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
            <Box
                sx={{
                    marginTop: "20px"
                }}
            >
                <Typography>
                    {Object.keys(formData)[3]}
                </Typography>

                {formData.content.map((element, index) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: "20px",
                            border: "1px solid #9d9d9d",
                            borderRadius: "10px",
                            padding: "10px"
                        }}
                    >
                        <FormControl>
                            <FormLabel>title</FormLabel>
                            <TextField
                                fullWidth
                                value={element.title}
                                onChange={(e) => handleContentChange(index, "title", e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>description</FormLabel>
                            <TextField
                                fullWidth
                                value={element.description}
                                onChange={(e) => handleContentChange(index, "description", e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>content</FormLabel>
                            <TextField
                                fullWidth
                                value={element.content}
                                onChange={(e) => handleContentChange(index, "content", e.target.value)}
                            />
                        </FormControl>
                    </Box>
                ))}

                <Button
                    variant="outlined"
                    onClick={() => setFormData({
                        ...formData,
                        content: [...formData.content, {title: '', description: '', content: ''}]
                    })}
                >
                    Add Card
                </Button>
            </Box>

            <Button type={"submit"}>
                Submit
            </Button>
        </Box>
    )
}

export default CreateGrammar;