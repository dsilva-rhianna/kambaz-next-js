"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { Button } from "react-bootstrap";
import * as client from "../client";

export default function QuizDetails() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [lastAttempt, setLastAttempt] = useState<any>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [accessCode, setAccessCode] = useState("");
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = (currentUser as any)?.role === "FACULTY" || (currentUser as any)?.role === "ADMIN";

  useEffect(() => {
    const fetchData = async () => {
      const quizData = await client.findQuizById(qid);
      setQuiz(quizData);
      const questionData = await client.findQuestionsForQuiz(qid);
      setQuestions(questionData);
      if (!isFaculty && currentUser) {
        try {
          const attempt = await client.getLastAttempt((currentUser as any)._id, qid);
          if (attempt) setLastAttempt(attempt);
          const allAttempts = await client.getAttemptsForQuiz((currentUser as any)._id, qid);
          setAttemptCount(allAttempts.length);
        } catch {}
      }
    };
    fetchData();
  }, [qid]);

  const handleTogglePublish = async () => {
    if (quiz.published) {
      await client.unpublishQuiz(qid);
    } else {
      await client.publishQuiz(qid);
    }
    setQuiz({ ...quiz, published: !quiz.published });
  };

  const getAvailabilityStatus = () => {
    const now = new Date();
    const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const until = quiz.untilDate ? new Date(quiz.untilDate) : null;
    if (until && now > until) return "Closed";
    if (available && now < available) return `Not available until ${available.toLocaleDateString()}`;
    return "Available";
  };

  const isQuizAvailable = () => {
    const now = new Date();
    const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const until = quiz.untilDate ? new Date(quiz.untilDate) : null;
    if (available && now < available) return false;
    if (until && now > until) return false;
    return true;
  };

  const attemptsRemaining = quiz ? quiz.attemptsAllowed - attemptCount : 0;
  const canTakeQuiz = quiz && isQuizAvailable() && attemptsRemaining > 0 && quiz.published;

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="p-4">
      {isFaculty ? (
        <>
          <div className="d-flex gap-2 mb-4">
            <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)}>
              Preview
            </Button>
            <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}>
              Edit
            </Button>
            <Button
              variant={quiz.published ? "success" : "outline-secondary"}
              onClick={handleTogglePublish}
            >
              {quiz.published ? "Unpublish" : "Publish"}
            </Button>
          </div>

          <h2>{quiz.title}</h2>
          <hr />

          <table className="table table-borderless w-50">
            <tbody>
              <tr><td><strong>Quiz Type</strong></td><td>{quiz.quizType}</td></tr>
              <tr><td><strong>Points</strong></td><td>{quiz.points ?? 0}</td></tr>
              <tr><td><strong>Number of Questions</strong></td><td>{questions.length}</td></tr>
              <tr><td><strong>Assignment Group</strong></td><td>{quiz.assignmentGroup}</td></tr>
              <tr><td><strong>Shuffle Answers</strong></td><td>{quiz.shuffleAnswers ? "Yes" : "No"}</td></tr>
              <tr><td><strong>Time Limit</strong></td><td>{quiz.timeLimit} Minutes</td></tr>
              <tr><td><strong>Multiple Attempts</strong></td><td>{quiz.multipleAttempts ? "Yes" : "No"}</td></tr>
              <tr><td><strong>Attempts Allowed</strong></td><td>{quiz.attemptsAllowed}</td></tr>
              <tr><td><strong>Show Correct Answers</strong></td><td>{quiz.showCorrectAnswers || "Never"}</td></tr>
              <tr><td><strong>Access Code</strong></td><td>{quiz.accessCode || "None"}</td></tr>
              <tr><td><strong>One Question at a Time</strong></td><td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td></tr>
              <tr><td><strong>Webcam Required</strong></td><td>{quiz.webcamRequired ? "Yes" : "No"}</td></tr>
              <tr><td><strong>Lock Questions After Answering</strong></td><td>{quiz.lockQuestions ? "Yes" : "No"}</td></tr>
              <tr><td><strong>Due Date</strong></td><td>{quiz.dueDate ? new Date(quiz.dueDate).toLocaleString() : "None"}</td></tr>
              <tr><td><strong>Available Date</strong></td><td>{quiz.availableDate ? new Date(quiz.availableDate).toLocaleString() : "None"}</td></tr>
              <tr><td><strong>Until Date</strong></td><td>{quiz.untilDate ? new Date(quiz.untilDate).toLocaleString() : "None"}</td></tr>
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h2>{quiz.title}</h2>
          <hr />
          <p><strong>Availability:</strong> {getAvailabilityStatus()}</p>
          <p><strong>Due:</strong> {quiz.dueDate ? new Date(quiz.dueDate).toLocaleString() : "None"}</p>
          <p><strong>Time Limit:</strong> {quiz.timeLimit} Minutes</p>
          <p><strong>Attempts Allowed:</strong> {quiz.attemptsAllowed}</p>
          <p><strong>Attempts Remaining:</strong> {attemptsRemaining}</p>

          {quiz.accessCode && (
            <div className="mb-3">
              <label><strong>Access Code:</strong></label>
              <input
                type="text"
                className="form-control w-25 mt-1"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter access code"
              />
            </div>
          )}

          {lastAttempt && (
            <p>
              <strong>Last Score:</strong> {lastAttempt.score} pts —{" "}
              <span
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/results`)}
              >
                View Last Attempt
              </span>
            </p>
          )}

          <Button
            variant="danger"
            disabled={!canTakeQuiz}
            onClick={() => {
              if (quiz.accessCode && accessCode !== quiz.accessCode) {
                alert("Incorrect access code");
                return;
              }
              router.push(`/courses/${cid}/quizzes/${qid}/take`);
            }}
          >
            {attemptCount === 0 ? "Start Quiz" : "Retake Quiz"}
          </Button>
        </>
      )}
    </div>
  );
}