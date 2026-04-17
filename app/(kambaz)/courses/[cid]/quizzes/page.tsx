"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdDoNotDisturb } from "react-icons/md";
import * as client from "./client";

export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [lastAttempts, setLastAttempts] = useState<{ [quizId: string]: any }>({});
  const menuRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = (currentUser as any)?.role === "FACULTY" || (currentUser as any)?.role === "ADMIN";

  const fetchLastAttempts = async (quizList: any[]) => {
    if (isFaculty || !currentUser) return;
    const attempts: { [quizId: string]: any } = {};
    await Promise.all(
      quizList.map(async (quiz: any) => {
        try {
          const attempt = await client.getLastAttempt((currentUser as any)._id, quiz._id);
          if (attempt) attempts[quiz._id] = attempt;
        } catch {}
      })
    );
    setLastAttempts(attempts);
  };

  const fetchQuizzes = async () => {
    try {
      const data = await client.findQuizzesForCourse(cid);
      const sorted = data.sort((a: any, b: any) =>
        new Date(a.availableDate).getTime() - new Date(b.availableDate).getTime()
      );
      setQuizzes(sorted);
      await fetchLastAttempts(sorted);
    } catch (err) {
      console.error("Failed to fetch quizzes", err);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getAvailabilityStatus = (quiz: any) => {
    const now = new Date();
    const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const until = quiz.untilDate ? new Date(quiz.untilDate) : null;
    if (until && now > until) return <span className="text-danger">Closed</span>;
    if (available && now < available)
      return <span className="text-danger">Not available until {available.toLocaleDateString()}</span>;
    return <span className="text-success">Available</span>;
  };

  const handleAddQuiz = async () => {
    const newQuiz = await client.createQuiz({
      course: cid,
      title: "New Quiz",
      description: "",
      quizType: "Graded Quiz",
      assignmentGroup: "Quizzes",
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: false,
      attemptsAllowed: 1,
      showCorrectAnswers: "",
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestions: false,
      published: false,
    });
    router.push(`/courses/${cid}/quizzes/${newQuiz._id}/edit`);
  };

  const handleDelete = async (quizId: string) => {
    if (!window.confirm("Delete this quiz?")) return;
    await client.deleteQuiz(quizId);
    setQuizzes((prev) => prev.filter((q) => q._id !== quizId));
  };

  const handleTogglePublish = async (quiz: any) => {
    if (quiz.published) {
      await client.unpublishQuiz(quiz._id);
    } else {
      await client.publishQuiz(quiz._id);
    }
    setQuizzes((prev) =>
      prev.map((q) => q._id === quiz._id ? { ...q, published: !q.published } : q)
    );
  };

  return (
    <div id="wd-quizzes">
      <div className="d-flex justify-content-end align-items-center mb-4">
        {isFaculty && (
          <Button variant="danger" onClick={handleAddQuiz}>
            <FaPlus className="me-2" />
            Quiz
          </Button>
        )}
      </div>

      <ListGroup className="rounded-0">
        <ListGroupItem className="p-0 mb-4 fs-5 border-gray">
          <div className="p-3 ps-2 bg-secondary">
            <strong>QUIZZES</strong>
          </div>

          <ListGroup className="rounded-0">
            {quizzes.length === 0 ? (
              <ListGroupItem className="text-center text-muted p-4">
                No quizzes yet.{isFaculty && " Click + Quiz to add one."}
              </ListGroupItem>
            ) : (
              quizzes.map((quiz: any) => (
                <ListGroupItem key={quiz._id} className="p-3 ps-1 d-flex align-items-start">
                  <div className="flex-grow-1">
                    <div
                      className="fw-bold fs-5 text-decoration-none text-dark"
                      style={{ cursor: "pointer" }}
                      onClick={() => router.push(`/courses/${cid}/quizzes/${quiz._id}`)}
                    >
                      {quiz.title}
                    </div>
                    <div className="text-muted mt-1 small">
                      {getAvailabilityStatus(quiz)}
                      {quiz.dueDate && (
                        <> | <strong>Due</strong> {new Date(quiz.dueDate).toLocaleDateString()}</>
                      )}
                      {" | "}{quiz.points ?? 0} pts
                      {" | "}{quiz.questionCount ?? 0} Questions
                      {!isFaculty && lastAttempts[quiz._id] && (
                        <> | <strong>Score:</strong> {lastAttempts[quiz._id].score} pts</>
                      )}
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2 ms-3">
                    {isFaculty ? (
                      <>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handleTogglePublish(quiz)}
                          title={quiz.published ? "Unpublish" : "Publish"}
                        >
                          {quiz.published
                            ? <BsCheckCircleFill className="text-success fs-5" />
                            : <MdDoNotDisturb className="text-danger fs-5" />}
                        </span>

                        <div className="position-relative" ref={openMenuId === quiz._id ? menuRef : null}>
                          <IoEllipsisVertical
                            className="fs-4"
                            style={{ cursor: "pointer" }}
                            onClick={() => setOpenMenuId(openMenuId === quiz._id ? null : quiz._id)}
                          />
                          {openMenuId === quiz._id && (
                            <div
                              className="position-absolute end-0 bg-white border rounded shadow"
                              style={{ zIndex: 1000, minWidth: "150px" }}
                            >
                              <div
                                className="p-2 px-3"
                                style={{ cursor: "pointer" }}
                                onClick={() => { router.push(`/courses/${cid}/quizzes/${quiz._id}/edit`); setOpenMenuId(null); }}
                              >
                                Edit
                              </div>
                              <div
                                className="p-2 px-3"
                                style={{ cursor: "pointer" }}
                                onClick={() => { handleDelete(quiz._id); setOpenMenuId(null); }}
                              >
                                Delete
                              </div>
                              <div
                                className="p-2 px-3"
                                style={{ cursor: "pointer" }}
                                onClick={() => { handleTogglePublish(quiz); setOpenMenuId(null); }}
                              >
                                {quiz.published ? "Unpublish" : "Publish"}
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      quiz.published
                        ? <BsCheckCircleFill className="text-success fs-5" />
                        : <MdDoNotDisturb className="text-danger fs-5" />
                    )}
                  </div>
                </ListGroupItem>
              ))
            )}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}