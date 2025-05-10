import {useEffect, useState} from "react";
import axios from 'axios'
import {Box, Pagination, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type GrammarCardContent = {
    title: string;
    description: string;
    content: string;
}

type GrammarCard = {
    id: number;
    level: string;
    title: string;
    description: string;
    content: GrammarCardContent[];
}

type PageResponse<T> = {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number;
}

function UpdateGrammar() {
    const [formData, setFormData] = useState<GrammarCard[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const handleCardChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        cardIndex: number
    ) => {
        const {name, value} = e.target;
        setFormData(prev => {
            const updated = [...prev];
            updated[cardIndex] = {
                ...updated[cardIndex],
                [name]: value
            };
            return updated;
        });
    };

    const handleContentChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        cardIndex: number,
        contentIndex: number
    ) => {
        const {name, value} = e.target;
        setFormData(prev => {
            const updated = [...prev];
            const updatedContent = [...updated[cardIndex].content];
            updatedContent[contentIndex] = {
                ...updatedContent[contentIndex],
                [name]: value
            };
            updated[cardIndex] = {
                ...updated[cardIndex],
                content: updatedContent
            };
            return updated;
        });
    };

    async function getData(pageNumber: number) {
        const response = await axios.get<PageResponse<GrammarCard>>(
            `http://localhost:8080/api/grammar-card/all?page=${pageNumber}&size=1`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }
            }
        );

        setFormData(response.data.content);
        setTotalPages(response.data.totalPages);
        setPage(response.data.number);
    }

    async function handleDelete(cardId: number) {
        await axios.delete(
            `http://localhost:8080/api/grammar-card/${cardId}`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }
            }
        )
    }

    async function handleSubmit(id: number) {
        await axios.put(
            `http://localhost:8080/api/grammar-card/${id}`,
            formData[0],
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }
            }
        )
    }

    useEffect(() => {
        getData(page);
    }, [page]);

    return (

        <Box>
            <Box sx={{
                border: "1px solid #9ccf62",
                borderRadius: "10px",
                padding: "20px"
            }}>
                {formData.map((card, cardIndex) => (
                    <Box key={cardIndex}>
                        <Typography>{`Card: ${cardIndex}`}</Typography>
                        <TextField
                            label="level"
                            name="level"
                            value={card.level}
                            onChange={(e) => handleCardChange(e, cardIndex)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="title"
                            name="title"
                            value={card.title}
                            onChange={(e) => handleCardChange(e, cardIndex)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="description"
                            name="description"
                            value={card.description}
                            onChange={(e) => handleCardChange(e, cardIndex)}
                            fullWidth
                            margin="normal"
                        />
                        <Box>
                            {card.content.map((element, contentIndex) => (
                                <Box key={contentIndex}>
                                    <Typography>{`Card content: ${contentIndex}`}</Typography>
                                    <TextField
                                        label="title"
                                        name="title"
                                        value={element.title}
                                        onChange={(e) => handleContentChange(e, cardIndex, contentIndex)}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="description"
                                        name="description"
                                        value={element.description}
                                        onChange={(e) => handleContentChange(e, cardIndex, contentIndex)}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <TextField
                                        label="content"
                                        name="content"
                                        value={element.content}
                                        onChange={(e) => handleContentChange(e, cardIndex, contentIndex)}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>

            <Box sx={{
                display: "flex",
                justifyContent: "end",

            }}>
                <Button
                    sx={{color: "red"}}
                    onClick={() => {
                        const isConfirmed = window.confirm("Are you sure you want to delete this card?");
                        if (isConfirmed) {
                            handleDelete(formData[0].id);
                        }
                    }}
                >
                    Delete Card
                </Button>
            </Box>

            <Box sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px"
            }}>
                <Pagination count={totalPages}
                            page={page + 1}
                            onChange={(_, value) => setPage(value - 1)}
                            color="standard"
                            variant="outlined" />
            </Box>

            <Button onClick={() => handleSubmit(formData[0].id)}>
                Submit
            </Button>
        </Box>
    );
}

export default UpdateGrammar;