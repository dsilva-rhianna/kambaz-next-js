"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical, BsSearch, BsCaretDownFill } from "react-icons/bs";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useState, useEffect } from "react";
import * as client from "../assignments/client";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const [assignments, setAssignments] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const isFaculty =
    (currentUser as any)?.role === "FACULTY" ||
    (currentUser as any)?.role === "ADMIN";

  const fetchAssignments = async () => {
    try {
      const assignments = await client.findAssignmentsForCourse(cid);
      setAssignments(assignments);
    } catch (error) {
      console.error("Failed to fetch assignments", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const handleDelete = async (assignmentId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this assignment?"
    );
    if (!confirmed) return;

    try {
      await client.deleteAssignment(assignmentId);
      setAssignments((prev) => prev.filter((a) => a._id !== assignmentId));
    } catch (error) {
      console.error("Failed to delete assignment", error);
    }
  };

  const filteredAssignments = assignments.filter((assignment: any) =>
    assignment.title.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (date: string) => {
    if (!date) return "";
    return new Date(date).toLocaleString();
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="position-relative" style={{ width: "320px" }}>
          <BsSearch className="position-absolute top-50 start-0 translate-middle-y ms-3" />
          <Form.Control
            placeholder="Search for Assignment"
            className="ps-5"
            style={{ height: "40px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="d-flex align-items-center">
          <Button variant="secondary" className="me-2 text-nowrap">
            <FaPlus className="me-2" />
            Group
          </Button>

          {isFaculty && (
            <Button
              variant="danger"
              className="me-2 text-nowrap"
              onClick={() => router.push(`/courses/${cid}/assignments/new`)}
            >
              <FaPlus className="me-2" />
              Assignment
            </Button>
          )}
        </div>
      </div>

      <ListGroup className="rounded-0" id="wd-assignments-list">
        <ListGroupItem className="wd-module p-0 mb-4 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <BsCaretDownFill className="me-3" />
            <strong>ASSIGNMENTS</strong>
            <span className="float-end">
              <span className="wd-percent-pill me-3">40% of Total</span>
              <FaPlus className="me-3" />
              <IoEllipsisVertical className="fs-4" />
            </span>
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {filteredAssignments.map((assignment: any) => (
              <ListGroupItem
                key={assignment._id}
                className="wd-lesson p-3 ps-1"
              >
                <BsGripVertical className="me-2 fs-3" />

                {isFaculty && (
                  <Link
                    href={`/courses/${cid}/assignments/${assignment._id}`}
                    className="text-decoration-none"
                  >
                    <FaRegEdit className="me-3 text-success" />
                  </Link>
                )}

                <Link
                  href={`/courses/${cid}/assignments/${assignment._id}`}
                  className="fw-bold fs-5 text-decoration-none text-dark"
                >
                  {assignment.title}
                </Link>

                <span className="float-end">
                  {isFaculty && (
                    <FaTrash
                      className="text-danger me-3 fs-5"
                      onClick={() => handleDelete(assignment._id)}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                  <BsCheckCircleFill className="text-success me-3 fs-5" />
                  <IoEllipsisVertical className="fs-4" />
                </span>

                <div className="text-muted mt-1">
                  <span className="text-danger">Multiple Modules</span> |
                  <strong> Not available until</strong>{" "}
                  {formatDate(assignment.available)} |
                  <strong> Due</strong> {formatDate(assignment.due)} |{" "}
                  {assignment.points} pts
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}