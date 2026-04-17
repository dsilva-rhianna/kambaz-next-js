"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form, Nav } from "react-bootstrap";
import { FaTrash } from "react-icons/fa6";
import * as client from "../../../client";

export default function QuizQuestionsEditor() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  const fetchQuestions = async () => {
    const data = await client.findQuestionsForQuiz(qid);
    setQuestions(data);
  };

  useEffect(() => {
    fetchQuestions();
  }, [qid]);

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  const handleAddQuestion = async () => {
    const newQ = await client.createQuestion({
      quiz: qid,
      title: "New Question",
      questionText: "",
      type: "MC",
      points: 1,
      choices: [
        { text: "", isCorrect: true },
        { text: "", isCorrect: false },
      ],
      correctAnswer: true,
      correctAnswers: [],
    });
    await fetchQuestions();
    setEditingId(newQ._id);
    setEditForm(newQ);
  };

  const handleEdit = (q: any) => {
    setEditingId(q._id);
    setEditForm({ ...q });
  };

  const handleDelete = async (questionId: string) => {
    if (!window.confirm("Delete this question?")) return;
    await client.deleteQuestion(questionId);
    setQuestions((prev) => prev.filter((q) => q._id !== questionId));
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleSaveQuestion = async () => {
    await client.updateQuestion(editForm._id, editForm);
    await fetchQuestions();
    setEditingId(null);
    setEditForm(null);
  };

  const handleSaveAndPublish = async () => {
    await client.updateQuestion(editForm._id, editForm);
    await client.publishQuiz(qid);
    router.push(`/courses/${cid}/quizzes`);
  };

  const renderEditor = () => {
    if (!editForm) return null;
    const type = editForm.type;

    return (
      <div className="border rounded p-3 mb-3 bg-light">
        <Form.Group className="mb-2">
          <Form.Label>Question Type</Form.Label>
          <Form.Select
            value={editForm.type}
            onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
            style={{ width: "200px" }}
          >
            <option value="MC">Multiple Choice</option>
            <option value="TF">True/False</option>
            <option value="FIB">Fill in the Blank</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={editForm.title || ""}
            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            value={editForm.points ?? 1}
            onChange={(e) => setEditForm({ ...editForm, points: parseInt(e.target.value) })}
            style={{ width: "100px" }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Question</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={editForm.questionText || ""}
            onChange={(e) => setEditForm({ ...editForm, questionText: e.target.value })}
          />
        </Form.Group>

        {type === "MC" && (
          <div className="mb-3">
            <Form.Label>Answer Choices</Form.Label>
            {(editForm.choices || []).map((choice: any, i: number) => (
              <div key={i} className="d-flex align-items-center gap-2 mb-2">
                <input
                  type="radio"
                  name={`edit-question-${editForm._id}`}
                  id={`edit-choice-${editForm._id}-${i}`}
                  checked={choice.isCorrect}
                  onChange={() => setEditForm({
                    ...editForm,
                    choices: editForm.choices.map((c: any, idx: number) => ({
                      ...c, isCorrect: idx === i
                    }))
                  })}
                />
                <Form.Control
                  as="textarea"
                  rows={1}
                  value={choice.text}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    choices: editForm.choices.map((c: any, idx: number) =>
                      idx === i ? { ...c, text: e.target.value } : c
                    )
                  })}
                />
                <FaTrash
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => setEditForm({
                    ...editForm,
                    choices: editForm.choices.filter((_: any, idx: number) => idx !== i)
                  })}
                />
              </div>
            ))}
            <Button variant="outline-secondary" size="sm" onClick={() =>
              setEditForm({ ...editForm, choices: [...(editForm.choices || []), { text: "", isCorrect: false }] })
            }>
              + Add Another Answer
            </Button>
          </div>
        )}

        {type === "TF" && (
          <div className="mb-3">
            <Form.Label>Correct Answer</Form.Label>
            <div className="d-flex gap-3">
              <div className="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name={`edit-tf-${editForm._id}`}
                  id={`edit-tf-${editForm._id}-true`}
                  checked={editForm.correctAnswer === true}
                  onChange={() => setEditForm({ ...editForm, correctAnswer: true })}
                />
                <label htmlFor={`edit-tf-${editForm._id}-true`}>True</label>
              </div>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name={`edit-tf-${editForm._id}`}
                  id={`edit-tf-${editForm._id}-false`}
                  checked={editForm.correctAnswer === false}
                  onChange={() => setEditForm({ ...editForm, correctAnswer: false })}
                />
                <label htmlFor={`edit-tf-${editForm._id}-false`}>False</label>
              </div>
            </div>
          </div>
        )}

        {type === "FIB" && (
          <div className="mb-3">
            <Form.Label>Correct Answers (case-insensitive)</Form.Label>
            {(editForm.correctAnswers || []).map((ans: string, i: number) => (
              <div key={i} className="d-flex align-items-center gap-2 mb-2">
                <Form.Control
                  type="text"
                  value={ans}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    correctAnswers: editForm.correctAnswers.map((a: string, idx: number) =>
                      idx === i ? e.target.value : a
                    )
                  })}
                />
                <FaTrash
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => setEditForm({
                    ...editForm,
                    correctAnswers: editForm.correctAnswers.filter((_: any, idx: number) => idx !== i)
                  })}
                />
              </div>
            ))}
            <Button variant="outline-secondary" size="sm" onClick={() =>
              setEditForm({ ...editForm, correctAnswers: [...(editForm.correctAnswers || []), ""] })
            }>
              + Add Another Answer
            </Button>
          </div>
        )}

        <div className="d-flex gap-2 mt-3">
          <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveQuestion}>
            {questions.find(q => q._id === editForm._id) ? "Update Question" : "Save Question"}
          </Button>
          <Button variant="success" onClick={handleSaveAndPublish}>Save & Publish</Button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <Nav variant="tabs" className="mb-4">
        <Nav.Item>
          <Nav.Link
            style={{ color: "crimson", cursor: "pointer" }}
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={true}
            style={{ color: "black", cursor: "pointer" }}
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <strong>Total Points: {totalPoints}</strong>
        <Button variant="danger" onClick={handleAddQuestion}>
          + New Question
        </Button>
      </div>

      {questions.length === 0 && !editingId && (
        <div className="text-center text-muted p-4">
          No questions yet. Click + New Question to add one.
        </div>
      )}

      {questions.map((q: any) => (
        <div key={q._id}>
          {editingId === q._id ? (
            renderEditor()
          ) : (
            <div className="border rounded p-3 mb-2 d-flex justify-content-between align-items-center">
              <div>
                <strong>{q.title}</strong>
                <span className="text-muted ms-3">
                  {q.type === "MC" ? "Multiple Choice" : q.type === "TF" ? "True/False" : "Fill in the Blank"}
                </span>
                <span className="text-muted ms-3">{q.points} pts</span>
              </div>
              <div className="d-flex gap-2">
                <Button size="sm" variant="outline-primary" onClick={() => handleEdit(q)}>Edit</Button>
                <Button size="sm" variant="outline-danger" onClick={() => handleDelete(q._id)}>Delete</Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}