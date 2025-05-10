import {useEffect, useState} from "react";
import axios from 'axios'
import {Box, Pagination, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type EssayRequest = {
    id: number;
    level: string;
    title: string;
};

type PageResponse<T> = {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number;
}

function UpdateWriting() {
    const [backData, setBackData] = useState<EssayRequest[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    async function getData(pageNumber: number) {
        const response = await axios.get<PageResponse<EssayRequest>>(
            `http://localhost:8080/api/essay/all?page=${pageNumber}&size=3`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }
            }
        );

        setBackData(response.data.content);
        setPage(response.data.number);
        setTotalPages(response.data.totalPages);
    }

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) {
        const {name, value} = event.target;

        setBackData(prevState => {
            const updated = [...prevState];
            updated[index] = {
                ...updated[index],
                [name]: value
            };
            return updated;
        });
    }

    async function handleDelete(writingId: number) {
        await axios.delete(
            `http://localhost:8080/api/essay/${writingId}`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }
            }
        )
    }

    async function handleSubmit() {
        await axios.put(
            'http://localhost:8080/api/essay',
            backData,
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
        <Box
            sx={{
                border: "1px solid #9ccf62",
                borderRadius: "10px",
                padding: "20px"
            }}
        >
            {backData.map((data, index) => (
                <Box
                    sx={{
                        border: "1px solid #9ccf62",
                        borderRadius: "10px",
                        padding: "20px",
                        marginBottom: "10px"
                    }}
                    key={index}>
                    <Box>
                        <Typography>
                            {`Essay: ${index}`}
                        </Typography>

                        <TextField
                            label="level"
                            name="level"
                            value={data.level}
                            onChange={(e) => handleChange(e, index)}
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            label="title"
                            name="title"
                            value={data.title}
                            onChange={(e) => handleChange(e, index)}
                            fullWidth
                            margin="normal"
                        />
                    </Box>
                    <Button
                        sx={{color: "red"}}
                        onClick={() => {
                            const isConfirmed = window.confirm("Are you sure you want to delete it?");
                            if (isConfirmed) {
                                handleDelete(data.id);
                            }
                        }}
                    >
                        Delete writing
                    </Button>
                </Box>
            ))}

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

            <Button onClick={() => handleSubmit()}>
                Submit
            </Button>
        </Box>
    )
}

export default UpdateWriting;