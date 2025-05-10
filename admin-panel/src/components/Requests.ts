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
