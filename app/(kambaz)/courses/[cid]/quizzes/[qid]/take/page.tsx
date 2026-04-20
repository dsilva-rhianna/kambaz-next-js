"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { Button, Form, Alert } from "react-bootstrap";
import * as client from "../../client";

export default function QuizTake() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [qId: string]: any }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const startedAtRef = useRef<Date | null>(null);
  const submittedRef = useRef(false);
  const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizData = await client.findQuizById(qid);
        setQuiz(quizData);
        let questionData = await client.findQuestionsForQuiz(qid);
        if (quizData.shuffleAnswers) {
          questionData = questionData.map((q: any) =>
            q.type === "MC" && q.choices ? { ...q, choices: shuffle(q.choices) } : q);
        }
        setQuestions(questionData);
        startedAtRef.current = new Date();
      } catch (err) {
        console.error("Failed to load quiz", err);
        router.push(`/courses/${cid}/quizzes`);
      }
    };
    fetchData();
  }, [qid, cid, router]);

  const handleAnswer = (qId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = async () => {
    if (submittedRef.current || !currentUser) return;
    const unanswered = questions.filter(
      (q) => answers[q._id] === undefined || answers[q._id] === ""
    ).length;
    const msg =
      unanswered > 0 ? `You have ${unanswered} unanswered questions. Submit anyway?` : "Submit your quiz? You will not be able to change answers.";
    if (!window.confirm(msg)) return;
    submittedRef.current = true;
    setSubmitting(true);
    const answersPayload = questions.map((q) => ({
      questionId: q._id,
      answer: answers[q._id] ?? null,
    }));
    try {
      await client.createAttempt(qid, {
        quizId: qid,
        userId: (currentUser as any)._id,
        answers: answersPayload,
        startedAt: startedAtRef.current,
        submittedAt: new Date(),
      });
      router.push(`/courses/${cid}/quizzes/${qid}/results`);
    } catch (err) {
      submittedRef.current = false;
      setSubmitting(false);
      alert("Failed to submit quiz. Please try again.");
    }
  };

  const renderQuestion = (q: any, displayIndex: number) => (
    <div className="d-flex align-items-start gap-2 mb-4">
      <div className="flex-grow-1 border rounded overflow-hidden bg-white">
        <div className="d-flex justify-content-between align-items-center px-4 py-3"
        style={{ backgroundColor: "lightgray" }}>
          <strong className="fs-5">Question {displayIndex + 1}</strong>
          <span className="text-muted">{q.points} pts</span>
        </div>
        <div className="p-4">
          <div className="mb-3">{q.questionText}</div>
          <hr className="my-3" />
          {q.type === "MC" && (
            <div>
              {(q.choices || []).map((choice: any, i: number) => (
                <div key={i}>
                  <div className="d-flex align-items-center gap-2 py-2">
                    <input type="radio" name={`q-${q._id}`} id={`q-${q._id}-c-${i}`} checked={answers[q._id] === choice.text}
                      onChange={() => handleAnswer(q._id, choice.text)} />
                    <label htmlFor={`q-${q._id}-c-${i}`} className="mb-0 flex-grow-1" style={{ cursor: "pointer" }}>
                      {choice.text}
                    </label>
                  </div>
                  {i < q.choices.length - 1 && <hr className="my-0" />}
                </div>
              ))}
            </div>
          )}
          {q.type === "TF" && (
            <div>
              <div className="d-flex align-items-center gap-2 py-2">
                <input type="radio" name={`q-${q._id}`} id={`q-${q._id}-true`} checked={answers[q._id] === "true"}
                  onChange={() => handleAnswer(q._id, "true")}/>
                <label htmlFor={`q-${q._id}-true`} className="mb-0 flex-grow-1" style={{ cursor: "pointer" }}>
                  True
                </label>
              </div>
              <hr className="my-0" />
              <div className="d-flex align-items-center gap-2 py-2">
                <input type="radio" name={`q-${q._id}`} id={`q-${q._id}-false`} checked={answers[q._id] === "false"}
                  onChange={() => handleAnswer(q._id, "false")}/>
                <label htmlFor={`q-${q._id}-false`} className="mb-0 flex-grow-1" style={{ cursor: "pointer" }}>
                  False
                </label>
              </div>
            </div>
          )}
          {q.type === "FIB" && (
            <Form.Control type="text" value={answers[q._id] || ""}
              onChange={(e) => handleAnswer(q._id, e.target.value)}
              placeholder="Type your answer" />
          )}
        </div>
      </div>
    </div>
  );

  if (!quiz || questions.length === 0) {
    return <div className="p-4">Loading quiz...</div>;
  }
  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  return (
    <div className="p-4" style={{ maxWidth: "900px" }}>
      <h2 className="fw-bold">{quiz.title}</h2>
      <div className="text-muted mb-4">
        {totalPoints} pts | {questions.length} questions
      </div>
      {quiz.oneQuestionAtATime ? (
        <>
        <div className="d-flex gap-1 flex-wrap mb-3">
          {questions.map((q, i) => {
            const isCurrent = i === currentIndex;
            return (
              <Button key={q._id} size="sm"
                variant={isCurrent ? "danger" : "outline-secondary"}
                onClick={() => setCurrentIndex(i)}>
                {i + 1}
              </Button>
            );
          })}
        </div>
        {questions[currentIndex] && renderQuestion(questions[currentIndex], currentIndex)}
        <div className="d-flex justify-content-between mb-3 ms-5 ps-2">
          {currentIndex > 0 ? (
            <Button variant="light" className="border"
              onClick={() => setCurrentIndex((i) => i - 1)} >
              Previous
            </Button>) : (
            <span />
          )}
          {currentIndex < questions.length - 1 && (
            <Button variant="light" className="border ms-auto"
              onClick={() => setCurrentIndex((i) => i + 1)} >
              Next
            </Button>
          )}
        </div>
        </>
      ) : (
        questions.map((q, i) => renderQuestion(q, i))
      )}
      <div className="d-flex justify-content-end align-items-center gap-3 p-3 border rounded mt-4 ms-5"
        style={{ backgroundColor: "lightgray" }} >
        <span className="text-muted">
          Time Limit: {quiz.timeLimit ?? 0} Minutes
        </span>
        <Button variant="danger" disabled={submitting}
          onClick={handleSubmit} >
          {submitting ? "Submitting..." : "Submit Quiz"}
        </Button>
      </div>
    </div>
  );
}