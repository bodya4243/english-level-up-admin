import axios from 'axios';
import { useEffect, useState } from "react";
import { Box, Button, Pagination } from "@mui/material";
import TextField from "@mui/material/TextField";

type QuizQuestions = {
    question: string,
    options: string[],
    correct_answer: number
};

type QuizRequest = {
    id: number,
    title: string,
    focus: string,
    questions: QuizQuestions[]
};

type PageResponse<T> = {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number;
};

function UpdateTests() {
    const [backData, setBackData] = useState<QuizRequest[]>([]);
    const [formData, setFormData] = useState<QuizRequest | null>(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    async function getData(pageNumber: number) {
        const response = await axios.get<PageResponse<QuizRequest>>(
            `http://localhost:8080/api/quiz/all?page=${pageNumber}&size=1`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            }
        );

        setBackData(response.data.content);
        setPage(response.data.number);
        setTotalPages(response.data.totalPages);
    }

    useEffect(() => {
        getData(page);
    }, [page]);

    useEffect(() => {
        if (backData.length > 0) {
            setFormData(backData[0]);
        }
    }, [backData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (!formData) return;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleQuestionChange = (
        questionIndex: number,
        fieldType: keyof QuizQuestions,
        value: string | number
    ) => {
        if (!formData) return;
        const newQuestions = [...formData.questions];
        newQuestions[questionIndex] = {
            ...newQuestions[questionIndex],
            [fieldType]: value,
        };

        setFormData({
            ...formData,
            questions: newQuestions,
        });
    };

    const handleOptionChange = (
        questionIndex: number,
        optionIndex: number,
        value: string
    ) => {
        if (!formData) return;
        const updatedQuestions = [...formData.questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;

        setFormData({
            ...formData,
            questions: updatedQuestions,
        });
    };

    async function handleDelete(testId: number) {
        await axios.delete(
            `http://localhost:8080/api/quiz/${testId}`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                }
            }
        )
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData) return;

        try {
            await axios.put(`http://localhost:8080/api/quiz`, formData, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            alert("Quiz submitted successfully!");
        } catch (error) {
            console.error("Failed to submit quiz:", error);
            alert("Submission failed.");
        }
    };

    if (!formData) return null;

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ border: "1px solid #9ccf62", borderRadius: "10px", p: 2, mb: 2 }}>
                <TextField
                    label="title"
                    name="title"
                    value={formData.title}
                    fullWidth
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    label="focus"
                    name="focus"
                    value={formData.focus}
                    fullWidth
                    onChange={handleChange}
                    margin="normal"
                />
            </Box>

            {formData.questions.map((q, qIdx) => (
                <Box
                    key={qIdx}
                    sx={{ border: "1px solid #9ccf62", borderRadius: "10px", p: 2, mb: 2 }}
                >
                    <TextField
                        label="question"
                        value={q.question}
                        fullWidth
                        onChange={(e) => handleQuestionChange(qIdx, "question", e.target.value)}
                        margin="normal"
                    />

                    {q.options.map((opt, optIdx) => (
                        <TextField
                            key={optIdx}
                            value={opt}
                            fullWidth
                            onChange={(e) => handleOptionChange(qIdx, optIdx, e.target.value)}
                            margin="dense"
                        />
                    ))}

                    <TextField
                        label="correct_answer"
                        type="number"
                        value={q.correct_answer}
                        fullWidth
                        onChange={(e) =>
                            handleQuestionChange(qIdx, "correct_answer", Number(e.target.value))
                        }
                        margin="normal"
                    />
                </Box>
            ))}

            <Box sx={{
                display: "flex",
                justifyContent: "end",

            }}>
                <Button
                    sx={{color: "red"}}
                    onClick={() => {
                        const isConfirmed = window.confirm("Are you sure you want to delete it?");
                        if (isConfirmed) {
                            handleDelete(backData[0].id);
                        }
                    }}
                >
                    Delete test
                </Button>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                <Pagination
                    count={totalPages}
                    page={page + 1}
                    onChange={(_, value) => setPage(value - 1)}
                    color="standard"
                    variant="outlined"
                />
            </Box>

            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Box>
    );
}

export default UpdateTests;