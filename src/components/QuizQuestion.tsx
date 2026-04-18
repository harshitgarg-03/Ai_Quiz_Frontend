import React from "react";

export interface QuestionProps {
  type: "mcq" | "fillup" | "codeerror";
  title: string;
  question: string | { text: string };
  defectCode?: string;
  options?: (string | { text: string })[];
  correctAnswer?: string | { text: string };
  explanation?: string;
  selected?: string;
  onSelect?: (value: string) => void;
}

const QuizQuestion: React.FC<QuestionProps> = ({
  type,
  title,
  question,
  defectCode,
  options = [],
  explanation,
  selected,
  onSelect,
}) => {
  // 👇 Normalize question text (if object)
  const questionText =
    typeof question === "string" ? question : question?.text || "";

  // 👇 Normalize options
  const optionList = options.map((opt) =>
    typeof opt === "string" ? opt : opt?.text || ""
  );

  return (
    <div className="bg-[#1b1b3a] p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-white/80 mb-4">{questionText}</p>

      {/* CODE ERROR TYPE */}
      {type === "codeerror" && (
        <>
          {defectCode && (
            <pre className="bg-[#0f0f25] text-white/80 p-3 rounded-xl overflow-x-auto mb-4 text-sm">
              {defectCode}
            </pre>
          )}
          <textarea
            placeholder="Describe how you would fix the issue..."
            value={selected || ""}
            onChange={(e) => onSelect?.(e.target.value)}
            className="w-full bg-[#0f0f25] text-white/80 p-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </>
      )}

      {/* FILLUP TYPE */}
      {type === "fillup" && (
        <input
          type="text"
          placeholder="Type your answer..."
          value={selected || ""}
          onChange={(e) => onSelect?.(e.target.value)}
          className="w-full bg-[#0f0f25] text-white/80 p-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {/* MCQ TYPE */}
      {type === "mcq" && (
        <div className="flex flex-col gap-3">
          {optionList.map((option, idx) => (
            <label
              key={idx}
              className={`cursor-pointer p-3 rounded-xl border transition ${
                selected === option
                  ? "bg-blue-600 border-blue-700 text-white"
                  : "bg-[#0f0f25] border-gray-700 hover:bg-[#1f1f40]"
              }`}
            >
              <input
                type="radio"
                name={title}
                value={option}
                checked={selected === option}
                onChange={() => onSelect?.(option)}
                className="hidden"
              />
              {option}
            </label>
          ))}
        </div>
      )}

      {explanation && (
        <p className="mt-4 text-sm text-white/60 italic">💡 {explanation}</p>
      )}
    </div>
  );
};

export default QuizQuestion;
