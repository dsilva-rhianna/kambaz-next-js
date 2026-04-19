"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { Button, Alert } from "react-bootstrap";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import * as client from "../../client";

export default function QuizResults() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [attempt, setAttempt] = useState<any>(null);
  const [allAttempts, setAllAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;
      try {
        const userId = (currentUser as any)._id;
        const [quizData, questionData, lastAttempt, attempts] = await Promise.all([
          client.findQuizById(qid),
          client.findQuestionsForQuiz(qid),
          client.getLastAttempt(userId, qid),
          client.getAttemptsForQuiz(userId, qid),
        ]);
        setQuiz(quizData);
        setQuestions(questionData);
        setAttempt(lastAttempt);
        setAllAttempts(attempts || []);
      } catch (err) {
        console.error("Failed to load results", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [qid, currentUser]);

  if (loading) return <div className="p-4">Loading results...</div>;
  if (!quiz) {
    return (
      <div className="p-4">
        <Alert variant="danger">Quiz not found.</Alert>
      </div>
    );
  }

  const showCorrect = (() => {
    const setting = quiz.showCorrectAnswers || "Never";
    if (setting === "Immediately") return true;
    if (setting === "After Last Attempt") {
      return allAttempts.length >= (quiz.attemptsAllowed || 1);
    }
    return false;
  })();

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);
  const attemptsRemaining = (quiz.attemptsAllowed || 1) - allAttempts.length;
  const canRetake = quiz.multipleAttempts && attemptsRemaining > 0 && quiz.published;
  const answerByQuestion: { [qId: string]: any } = {};
  (attempt.answers || []).forEach((a: any) => {
    answerByQuestion[a.question] = a;
  });
  const renderStudentAnswer = (q: any, studentAnswer: any) => {
    if (studentAnswer === null || studentAnswer === undefined || studentAnswer === "") {
      return <em className="text-muted">No answer</em>;
    }
    if (q.type === "TF") {
      return String(studentAnswer).toLowerCase() === "true" ? "True" : "False";
    }
    return String(studentAnswer);
  };
  const renderCorrectAnswer = (q: any) => {
    if (q.type === "MC") {
      const correct = q.choices?.find((c: any) => c.isCorrect);
      return correct ? correct.text : "-";
    }
    if (q.type === "TF") {
      return q.correctAnswer ? "True" : "False";
    }
    if (q.type === "FIB") {
      return (q.correctAnswers || []).join(", ") || "-";
    }
    return "-";
  };

  return (
    <div className="p-4">
      <h2>{quiz.title}</h2>
      <hr />
      <div className="p-3 mb-4 border rounded bg-light">
        <h3 className="mb-1 fs-4">
          Score: {attempt.score} / {totalPoints}
        </h3>
        <div className="text-muted">
          Attempt {allAttempts.length} of {quiz.attemptsAllowed || 1}
        </div>
      </div>
      {questions.map((q, idx) => {
        const ans = answerByQuestion[q._id];
        const isCorrect = ans?.isCorrect;
        const borderClass = isCorrect ? "border-success" : "border-danger";
        return (
          <div key={q._id} className={`border rounded p-3 mb-3 border-2 ${borderClass}`}>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div className="d-flex align-items-center gap-2">
                {isCorrect ? (<BsCheckCircleFill className="text-success fs-4" />) : (<BsXCircleFill className="text-danger fs-4" />)}
                <strong>
                  Question {idx + 1}: {q.title}
                </strong>
              </div>
              <span className="text-muted">
                {ans?.pointsEarned ?? 0} / {q.points} pts
              </span>
            </div>
            <p className="mt-2">{q.questionText}</p>
            <div className="mt-3">
              <div>
                <strong>Your answer: </strong>
                <span className={isCorrect ? "text-success" : "text-danger"}>
                  {renderStudentAnswer(q, ans?.answer)}
                </span>
              </div>
              {showCorrect && !isCorrect && (
                <div className="mt-1">
                  <strong>Correct answer: </strong>
                  <span className="text-success">{renderCorrectAnswer(q)}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div className="d-flex gap-2 mt-4">
        <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}>
          Quiz Details
        </Button>
        <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes`)}>
          All Quizzes
        </Button>
        {canRetake && (
          <Button variant="danger" className="ms-auto"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/take`)}>
            Retake Quiz
          </Button>
        )}
      </div>
    </div>
  );
}