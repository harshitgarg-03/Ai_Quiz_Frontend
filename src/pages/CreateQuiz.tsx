import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizForm from "../components/QuizForm";
import QuizQuestion from "../components/QuizQuestion";
import Button from "../components/Button";
import { useAppSelector } from "../store/hook"; // your redux hook if you have one

const CreateQuizPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentQuiz } = useAppSelector((s) => s.quiz); // AI generated quiz
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // ✅ handle answer selection
  const handleSelect = (index: number, selected: string) => {
    setAnswers((prev) => ({ ...prev, [index]: selected }));
  };

  // ✅ calculate score & navigate to Result Page
  const handleSubmit = () => {
    if (!currentQuiz) return;
    
    
    const total = currentQuiz.questions.length;
    const answered = Object.keys(answers).length;

    if (answered < total) {
      alert("⚠️ Please answer all questions before submitting.");
      return;
    }

    // normalize text for case-insensitive comparison
    const normalize = (str: string) =>
      str?.replace(/\s+/g, " ").trim().toLowerCase();

    let score = 0;

    currentQuiz.questions.forEach((q: any, i: number) => {
      console.log(currentQuiz.questions);
      
      const userAns = normalize(answers[i] || "");
      const correctAns = normalize(q.answer || "");
      
      if (q.quizType === "fillup" || q.type === "fillup") {
        if (userAns === correctAns) score++;
      } else if (q.quizType === "codeerror" || q.type === "codeerror") {
        if (userAns.includes(correctAns)) score++;
      } else {
        // MCQ
        if (userAns === correctAns) score++;
      }
    });

    // ✅ navigate to result page with data
    navigate("/result", { state: { score, total } });
  };

  return (
    <div className="bg-[#0f0f25] text-white/90 font-display min-h-screen flex flex-col">
      <main className="flex-1 px-6 py-10 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Create a New Quiz
          </h1>
          <p className="text-base text-white/60 mt-2 max-w-2xl mx-auto">
            Enter a topic, select a quiz type, and let AI generate your quiz.
          </p>
        </div>

        <QuizForm />

        {currentQuiz && (
          <>
            <h3 className="mt-12 text-3xl font-bold">
              Generated Quiz — {currentQuiz.topic}
            </h3>
            <div className="mt-8 flex flex-col gap-8">
              {currentQuiz.questions.map((q: any, i: number) => (
                <QuizQuestion
                  key={i}
                  type={q.type || currentQuiz.quizType}
                  title={`Question ${i + 1}`}
                  question={q.question || ""}
                  defectCode={q.errorCode}
                  options={q.options || []}
                  correctAnswer={q.correctAnswer}
                  explanation={q.explanation}
                  selected={answers[i] || ""}
                  onSelect={(val) => handleSelect(i, val)}
                />
              ))}
            </div>

            {/* ✅ Submit button */}
            <div className="flex justify-end mt-10">
              <Button
                onClick={handleSubmit}
                className="px-6 py-3 text-base font-semibold bg-[#2b2bee] hover:bg-[#2b2bee]/80"
              >
                Submit Quiz
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default CreateQuizPage;
