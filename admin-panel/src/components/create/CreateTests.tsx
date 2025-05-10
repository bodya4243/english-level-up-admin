import axios from 'axios';
import { useState } from "react";
import { Box, Typography, FormControl, FormLabel, TextField, Button } from "@mui/material";

type QuizQuestions = {
    question: string,
    options: string[],
    correct_answer: number
};

type QuizRequest = {
    title: string,
    focus: string,
    questions: QuizQuestions[]
};

const defaultQuestion: QuizQuestions = {
    question: "subQuestion",
    options: ["defOption", "defOption1"],
    correct_answer: 0
};

function CreateTests() {
    const [formData, setFormData] = useState<QuizRequest>({
        title: "defTitle",
        focus: "A1",
        questions: [defaultQuestion]
    });

    const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;

        setFormData(prev => ({
            ...prev,
            questions: updatedQuestions
        }));
    };

    const addOption = (questionIndex: number) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[questionIndex].options.push("");

        setFormData(prev => ({
            ...prev,
            questions: updatedQuestions
        }));
    };

    const removeOption = (questionIndex: number, optionIndex: number) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[questionIndex].options.splice(optionIndex, 1);

        setFormData(prev => ({
            ...prev,
            questions: updatedQuestions
        }));
    };

    function handleQuestionChange(index: number, fieldType: keyof QuizQuestions, value: string | number) {
        const newQuestions = [...formData.questions];
        newQuestions[index] = {
            ...newQuestions[index],
            [fieldType]: value
        };

        setFormData({
            ...formData,
            questions: newQuestions
        });
    }

    function handleAddQuestion() {
        const newQuestions = [...formData.questions];

        newQuestions.push({
            question: "subQuestion",
            options: [''],
            correct_answer: 0
        });

        setFormData({
            ...formData,
            questions: newQuestions
        });
    }

    function handleRemoveQuestion(questionIndex: number) {
        const newQuestions = [...formData.questions];
        newQuestions.splice(questionIndex, 1);

        setFormData({
            ...formData,
            questions: newQuestions
        });
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            await axios.post(
                `http://localhost:8080/api/quiz`,
                formData,
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    }
                }
            );
            alert("Quiz submitted successfully!");
        } catch (error) {
            console.error("Failed to submit quiz:", error);
            alert("Submission failed.");
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
                <FormLabel>Title</FormLabel>
                <TextField
                    fullWidth
                    name="title"
                    variant="standard"
                    value={formData.title}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Focus</FormLabel>
                <TextField
                    fullWidth
                    name="focus"
                    variant="standard"
                    value={formData.focus}
                    onChange={handleChange}
                />
            </FormControl>

            <Typography variant="h6">Questions</Typography>

            {formData.questions.map((element, index) => (
                <Box key={index} sx={{ border: '1px solid #ccc', p: 2, borderRadius: 1 }}>
                    <FormControl fullWidth>
                        <FormLabel>{`Question ${index + 1}`}</FormLabel>
                        <TextField
                            fullWidth
                            value={element.question}
                            onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <FormLabel>Options</FormLabel>
                        {element.options.map((option, optIndex) => (
                            <Box key={optIndex} display="flex" alignItems="center" gap={1} mb={1}>
                                <TextField
                                    fullWidth
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                                />
                                <Button onClick={() => removeOption(index, optIndex)} color="error">
                                    Remove
                                </Button>
                            </Box>
                        ))}
                        <Button onClick={() => addOption(index)} variant="outlined" sx={{ mt: 1 }}>
                            Add Option
                        </Button>
                    </FormControl>

                    <FormControl fullWidth>
                        <FormLabel>Correct Answer (index)</FormLabel>
                        <TextField
                            type="number"
                            fullWidth
                            value={element.correct_answer}
                            onChange={(e) => handleQuestionChange(index, "correct_answer", Number(e.target.value))}
                        />
                    </FormControl>

                    <Box mt={2} display="flex" gap={2}>
                        <Button onClick={handleAddQuestion} variant="contained">
                            Add Question
                        </Button>
                        <Button onClick={() => handleRemoveQuestion(index)} color="error" variant="outlined">
                            Remove Question
                        </Button>
                    </Box>
                </Box>
            ))}

            <Box>
                <Button type="submit">
                    Submit
                </Button>
            </Box>
        </Box>
    );
}

export default CreateTests;
