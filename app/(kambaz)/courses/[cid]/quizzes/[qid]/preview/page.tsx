"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import * as client from "../../client";

export default function QuizPreview() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [qId: string]: any }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<{ [qId: string]: boolean }>({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const quizData = await client.findQuizById(qid);
      setQuiz(quizData);
      const questionData = await client.findQuestionsForQuiz(qid);
      setQuestions(questionData);
    };
    fetchData();
  }, [qid]);

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    let total = 0;
    const res: { [qId: string]: boolean } = {};
    questions.forEach((q) => {
      const answer = answers[q._id];
      let correct = false;
      if (q.type === "MC") {
        const correctChoice = q.choices?.find((c: any) => c.isCorrect);
        correct = correctChoice && answer === correctChoice.text;
      } else if (q.type === "TF") {
        correct = String(answer) === String(q.correctAnswer);
      } else if (q.type === "FIB") {
        correct = q.correctAnswers?.some(
          (a: string) => a.toLowerCase() === (answer || "").toLowerCase()
        );
      }
      res[q._id] = correct;
      if (correct) total += q.points || 0;
    });
    setResults(res);
    setScore(total);
    setSubmitted(true);
  };

  const renderQuestion = (q: any) => {
    const isCorrect = results[q._id];
    const border = submitted
      ? isCorrect ? "border-success" : "border-danger"
      : "";

    return (
      <div key={q._id} className={`border rounded p-3 mb-3 ${border}`}>
        <div className="d-flex justify-content-between">
          <strong>{q.title}</strong>
          <span>{q.points} pts</span>
        </div>
        <p className="mt-2">{q.questionText}</p>

        {q.type === "MC" && (
          <div>
            {q.choices?.map((choice: any, i: number) => (
              <div key={i} className="d-flex align-items-center gap-2 mb-1">
                <input
                  type="radio"
                  name={`question-${q._id}`}
                  id={`choice-${q._id}-${i}`}
                  checked={answers[q._id] === choice.text}
                  onChange={() => handleAnswer(q._id, choice.text)}
                  disabled={submitted}
                />
                <label htmlFor={`choice-${q._id}-${i}`}>{choice.text}</label>
              </div>
            ))}
          </div>
        )}

        {q.type === "TF" && (
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <input
                type="radio"
                name={`question-${q._id}`}
                id={`tf-${q._id}-true`}
                checked={answers[q._id] === "true"}
                onChange={() => handleAnswer(q._id, "true")}
                disabled={submitted}
              />
              <label htmlFor={`tf-${q._id}-true`}>True</label>
            </div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <input
                type="radio"
                name={`question-${q._id}`}
                id={`tf-${q._id}-false`}
                checked={answers[q._id] === "false"}
                onChange={() => handleAnswer(q._id, "false")}
                disabled={submitted}
              />
              <label htmlFor={`tf-${q._id}-false`}>False</label>
            </div>
          </div>
        )}

        {q.type === "FIB" && (
          <Form.Control
            type="text"
            value={answers[q._id] || ""}
            onChange={(e) => handleAnswer(q._id, e.target.value)}
            disabled={submitted}
            placeholder="Type your answer"
          />
        )}

        {submitted && (
          <div className={`mt-2 fw-bold ${isCorrect ? "text-success" : "text-danger"}`}>
            {isCorrect ? "✅ Correct" : "❌ Incorrect"}
          </div>
        )}
      </div>
    );
  };

  if (!quiz) return <div>Loading...</div>;

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  return (
    <div className="p-4">
      <div className="alert alert-warning d-flex justify-content-between align-items-center">
        <span>This is a preview of the published version of the quiz</span>
        <Button
          variant="outline-dark"
          size="sm"
          onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit/questions`)}
        >
          Edit Quiz
        </Button>
      </div>

      <h2>{quiz.title}</h2>

      <div className="d-flex gap-2 mb-4 flex-wrap">
        {questions.map((q, i) => (
          <Button
            key={q._id}
            size="sm"
            variant={currentIndex === i ? "danger" : "outline-secondary"}
            onClick={() => setCurrentIndex(i)}
          >
            {i + 1}
          </Button>
        ))}
      </div>

      {!submitted ? (
        <>
          {quiz.oneQuestionAtATime ? (
            <div>
              {questions[currentIndex] && renderQuestion(questions[currentIndex])}
              <div className="d-flex gap-2 mt-3">
                <Button
                  variant="secondary"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((i) => i - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="secondary"
                  disabled={currentIndex === questions.length - 1}
                  onClick={() => setCurrentIndex((i) => i + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          ) : (
            questions.map((q) => renderQuestion(q))
          )}

          <Button variant="danger" className="mt-4" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        </>
      ) : (
        <>
          {questions.map((q) => renderQuestion(q))}
          <div className="mt-4 p-3 border rounded bg-light">
            <h4>Score: {score} / {totalPoints}</h4>
          </div>
          <Button
            variant="secondary"
            className="mt-3"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}
          >
            Return to Quiz Details
          </Button>
        </>
      )}
    </div>
  );
}