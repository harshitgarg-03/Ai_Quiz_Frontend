export const quizApi = {
    createQuiz: async (payload: {
        topic: string;
        quizType: "mcq" | "fill" | "codeerror";
        questionNo: number;
        title?: string;
    }) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/quizzes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // important for cookie auth
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Failed to create quiz");
        }

        return await res.json();
    },
};
