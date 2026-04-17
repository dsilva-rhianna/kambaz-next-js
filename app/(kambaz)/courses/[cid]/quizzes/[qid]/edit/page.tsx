"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form, Nav } from "react-bootstrap";
import * as client from "../../client";

export default function QuizEditor() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const quizData = await client.findQuizById(qid);
      setQuiz(quizData);
      const questionData = await client.findQuestionsForQuiz(qid);
      setQuestions(questionData);
    };
    fetchData();
  }, [qid]);

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  const handleSave = async () => {
    await client.updateQuiz(qid, quiz);
    router.push(`/courses/${cid}/quizzes/${qid}`);
  };

  const handleSaveAndPublish = async () => {
    await client.updateQuiz(qid, { ...quiz, published: true });
    await client.publishQuiz(qid);
    router.push(`/courses/${cid}/quizzes`);
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/quizzes`);
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="mb-3">
        <strong>Total Points: {totalPoints}</strong>
      </div>

      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link
            active={true}
            style={{ color: "black", cursor: "pointer" }}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            style={{ color: "crimson", cursor: "pointer" }}
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit/questions`)}
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={quiz.title || ""}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={quiz.description || ""}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quiz Type</Form.Label>
          <Form.Select
            value={quiz.quizType || "Graded Quiz"}
            onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
          >
            <option>Graded Quiz</option>
            <option>Practice Quiz</option>
            <option>Graded Survey</option>
            <option>Ungraded Survey</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Assignment Group</Form.Label>
          <Form.Select
            value={quiz.assignmentGroup || "Quizzes"}
            onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
          >
            <option>Quizzes</option>
            <option>Exams</option>
            <option>Assignments</option>
            <option>Project</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Shuffle Answers"
            checked={quiz.shuffleAnswers ?? true}
            onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time Limit (minutes)</Form.Label>
          <Form.Control
            type="number"
            value={quiz.timeLimit ?? 20}
            onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) })}
            style={{ width: "100px" }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Multiple Attempts"
            checked={quiz.multipleAttempts ?? false}
            onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
          />
        </Form.Group>

        {quiz.multipleAttempts && (
          <Form.Group className="mb-3">
            <Form.Label>How Many Attempts</Form.Label>
            <Form.Control
              type="number"
              value={quiz.attemptsAllowed ?? 1}
              onChange={(e) => setQuiz({ ...quiz, attemptsAllowed: parseInt(e.target.value) })}
              style={{ width: "100px" }}
            />
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Show Correct Answers</Form.Label>
          <Form.Select
            value={quiz.showCorrectAnswers || "Never"}
            onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.value })}
          >
            <option>Never</option>
            <option>Immediately</option>
            <option>After Last Attempt</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Access Code</Form.Label>
          <Form.Control
            type="text"
            value={quiz.accessCode || ""}
            onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
            style={{ width: "200px" }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="One Question at a Time"
            checked={quiz.oneQuestionAtATime ?? true}
            onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Webcam Required"
            checked={quiz.webcamRequired ?? false}
            onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Lock Questions After Answering"
            checked={quiz.lockQuestions ?? false}
            onChange={(e) => setQuiz({ ...quiz, lockQuestions: e.target.checked })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="datetime-local"
            value={quiz.dueDate ? new Date(quiz.dueDate).toISOString().slice(0, 16) : ""}
            onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
            style={{ width: "250px" }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available Date</Form.Label>
          <Form.Control
            type="datetime-local"
            value={quiz.availableDate ? new Date(quiz.availableDate).toISOString().slice(0, 16) : ""}
            onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })}
            style={{ width: "250px" }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Until Date</Form.Label>
          <Form.Control
            type="datetime-local"
            value={quiz.untilDate ? new Date(quiz.untilDate).toISOString().slice(0, 16) : ""}
            onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })}
            style={{ width: "250px" }}
          />
        </Form.Group>
      </Form>

      <div className="d-flex gap-2 mt-4">
        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save</Button>
        <Button variant="success" onClick={handleSaveAndPublish}>Save & Publish</Button>
      </div>
    </div>
  );
}