import { createBrowserRouter } from "react-router-dom";
import Hacker from "../components/hacker";
import Question from "../components/question";
import Layout from "../layout/Layout";
import ExamResult from "../components/Exam";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Hacker></Hacker>
      </Layout>
    ),
  },
  {
    path: "/exam",
    element: (
      <Layout>
        <ExamResult></ExamResult>
      </Layout>
    ),
  },

  {
    path: "/question",
    element: (
      <Layout>
        <Question></Question>
      </Layout>
    ),
  },
]);

export default router;
