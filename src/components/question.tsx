import { useEffect, useState } from "react";
import axios from "axios";
import QuestionItem from "./questionItems";
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

export default function ExamPage() {
  const [questions, setQuestions] = useState<[]>([]);
  const [markDetails, setMarkDetails] = useState<[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [questionRes, markRes] = await Promise.all([
          axios.get("http://localhost:3000/questions"),
          axios.get("http://localhost:3000/markPointExamDetails"),
        ]);

        setQuestions(questionRes.data);
        setMarkDetails(markRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div>
        Tổng điểm: {markDetails.reduce((total, item: MarkDetail) => total + item.point, 0)}
      </div>
      {questions.map((q: Question , index) => (
        <QuestionItem
          key={q.id}
          question={q}
          index={index}
          markDetails={markDetails}
        />
      ))}
    </div>
  );
}
