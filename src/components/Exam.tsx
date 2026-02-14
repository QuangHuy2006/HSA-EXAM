import { useEffect, useState } from "react";
import QuestionItem from "./questionItems";
import type { Question, MarkDetail } from "./questionItems";

interface ExamResponse {
  questions: Question[];
  markPointExamDetails: MarkDetail[];
  countQuestions: number;
  exam: {
    id: number;
    title: string;
  };
}
export default function ExamResult() {
  const [data, setData] = useState<ExamResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("exam_token") || "");
  const [examId, setExamId] = useState<number>(localStorage.getItem("exam_id") ? parseInt(localStorage.getItem("exam_id")!) : 0);

  useEffect(() => {
    fetch(`https://api.hsavnu.edu.vn/exams/mark-point-exam/${examId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        Connection: "keep-alive",
        "login-signature":
          "4afed13ffb5a2abdefccb0950aca011948f6e171c39504f83f8c4bb16bdbb019",
        Origin: "https://hsavnu.edu.vn",
        Referer: "https://hsavnu.edu.vn/exams",
        "Access-Control-Allow-Origin": "https://hsavnu.edu.vn"
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi khi gọi API");
        return res.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);   
      });
  }, [token, examId]);
console.log(error);

  return (
    <div className="pb-20">
      <div className="mt-8 mb-6 p-4 bg-gray-100 rounded-xl shadow">
        <input
          type="text"
          placeholder="Nhập Bearer Token..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3"
        />
        <button
        onClick={() => localStorage.setItem("exam_token", token)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          {loading ? "Đang tải..." : "Load dữ liệu"}
        </button>
      </div>
      <div className="mt-8 mb-6 p-4 bg-gray-100 rounded-xl shadow">
        <input
          type="text"
          placeholder="Nhập exam id..."
          value={examId}
          onChange={(e) => setExamId(parseInt(e.target.value) || 0)}
          className="w-full p-3 border rounded-lg mb-3"
        />
        <button
        onClick={() => localStorage.setItem("exam_id", examId.toString())}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          {loading ? "Đang tải..." : "Load dữ liệu"}
        </button>
      </div>
      <h1 className="text-3xl font-bold text-center mt-8">
        {data?.exam?.title}
      </h1>

      <p className="text-center text-gray-600 mt-2">
        Tổng số câu: {data?.countQuestions}
      </p>

      {data?.questions.map((question, index) => (
        <QuestionItem
          key={question.id}
          question={question}
          index={index}
          markDetails={data?.markPointExamDetails}
        />
      ))}
    </div>
  );
}
