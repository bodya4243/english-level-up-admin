type WritingRequest = {
    level: string;
    title: string;
};

type ReadingRequest = {
    title: string;
    description: string;
    content: string;
    level: string;
};

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

type ListeningRequest = {
    title: string,
    description: string,
    level: string,
    filePath: string
}

type QuizQuestions = {
    question: string,
    options: string[],
    correct_answer: number
}

type QuizRequest = {
    title: string,
    focus: string,
    questions: QuizQuestions[]
}

type ActiveRequest<T extends string> =
    T extends "writing" ? WritingRequest :
        T extends "reading" ? ReadingRequest :
            T extends "grammar" ? GrammarRequest :
                T extends "listening" ? ListeningRequest :
                    T extends "tests" ? QuizRequest :
            never;

export const createRequest = <T extends
        "writing" | "reading" | "grammar" | "listening" | "tests">(state: T): ActiveRequest<T> => {
    switch (state) {
        case "writing":
            return {
                level: "A1",
                title: "something"
            } as ActiveRequest<T>;
        case "reading":
            return {
                title: "",
                description: "",
                content: "",
                level: "" } as ActiveRequest<T>;
        case "grammar":
            return {
                level: "lev",
                title: "title",
                description: "des",
                content: [{title: "title", description: "des", content: "con"}] } as ActiveRequest<T>;
        case "listening":
            return {
                title: "",
                description: "",
                level: "",
                filePath: ""
            } as ActiveRequest<T>
        case "tests":
            return {
                title: "quizTitle",
                focus: "quizFocus",
                questions: [{
                    question: "quizQuestion",
                    options: ["Go", "Goes","Went", "Gone"],
                    correct_answer: 2
                }]
            } as ActiveRequest<T>
        default:
            throw new Error(`Unexpected state: ${state}`);
    }
};
