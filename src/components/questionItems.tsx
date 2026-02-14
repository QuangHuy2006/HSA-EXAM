export interface Answer {
  id: number;
  content: string;
}


export interface Question {
  id: number;
  type: "type_single_choice" | "type_multiple_choice";
  content: string;
  children: []; // nếu chưa rõ thì để any[]
  dndAllAnswers: null;
  answers: Answer[];
}

export interface MarkDetail {
  id: number;
  questionId: number;
  answer: {
    type_single_choice?: number;
    type_multiple_choice?: number[];
  };
  result: {
    type_single_choice?: boolean;
    type_multiple_choice?: boolean;
  };
  point: number;
  isCorrect: boolean;
}

export default function QuestionItem({
  question,
  index,
  markDetails,
}: {
  question: Question;
  index: number;
  markDetails: MarkDetail[];
}) {

  const isCorrect: boolean = markDetails.some(
    (item) =>
      item.questionId == question.id &&
      item.isCorrect == true
  );

  return (
    <div
      className={`max-w-4xl mx-auto rounded-2xl p-8 mt-8 shadow-lg transition-all
        ${
          isCorrect
            ? "bg-green-300 border-2 border-green-500"
            : "bg-white border border-gray-200"
        }
      `}
    >
      <div className="text-xl font-bold mb-4">
        Câu {index + 1}
      </div>

      <div
        className="prose max-w-none mb-6 text-lg text-justify"
        dangerouslySetInnerHTML={{ __html: question.content }}
      />

      <div className="flex flex-col gap-3">
        {question.answers.map((answer: Answer) => (
          <div
            key={answer.id}
            className="p-4 border rounded-xl bg-gray-50"
            dangerouslySetInnerHTML={{
              __html: answer.content,
            }}
          />
        ))}
      </div>
    </div>
  );
}
