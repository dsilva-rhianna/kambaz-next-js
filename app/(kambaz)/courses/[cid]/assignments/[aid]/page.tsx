"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as client from "../../assignments/client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const isFaculty =
    (currentUser as any)?.role === "FACULTY" ||
    (currentUser as any)?.role === "ADMIN";

  const [assignment, setAssignment] = useState<any>({
    _id: "",
    title: "",
    description: "",
    points: 100,
    due: "",
    available: "",
    until: "",
    course: cid as string,
  });

  useEffect(() => {
    if (!isFaculty) {
      router.push(`/courses/${cid}/assignments`);
      return;
    }

    const fetchAssignment = async () => {
      if (aid === "new") return;

      try {
        const data = await client.findAssignmentById(aid as string);
        setAssignment({
          _id: data._id,
          title: data.title || "",
          description: data.description || "",
          points: data.points || 100,
          due: data.due ? data.due.substring(0, 16) : "",
          available: data.available ? data.available.substring(0, 16) : "",
          until: data.until ? data.until.substring(0, 16) : "",
          course: data.course || (cid as string),
        });
      } catch (error) {
        console.error("Failed to fetch assignment", error);
        router.push(`/courses/${cid}/assignments`);
      }
    };

    fetchAssignment();
  }, [aid, cid, isFaculty, router]);

  const handleSave = async () => {
    try {
      const payload = {
        ...assignment,
        course: cid as string,
      };

      if (aid === "new") {
        await client.createAssignment(cid as string, payload);
      } else {
        await client.updateAssignment({
          ...payload,
          _id: aid as string,
        });
      }

      router.push(`/courses/${cid}/assignments`);
    } catch (error) {
      console.error("Failed to save assignment", error);
    }
  };

  const handleDelete = async () => {
    if (aid === "new") {
      router.push(`/courses/${cid}/assignments`);
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this assignment?"
    );
    if (!confirmed) return;

    try {
      await client.deleteAssignment(aid as string);
      router.push(`/courses/${cid}/assignments`);
    } catch (error) {
      console.error("Failed to delete assignment", error);
    }
  };

  return (
    <div id="wd-assignments-editor">
      <Form>
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl
          id="wd-name"
          value={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
          className="mb-3"
        />

        <FormControl
          id="wd-description"
          as="textarea"
          rows={12}
          className="mb-4"
          value={assignment.description}
          onChange={(e) =>
            setAssignment({ ...assignment, description: e.target.value })
          }
        />

        <Row className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Points
          </FormLabel>
          <Col sm={9}>
            <FormControl
              type="number"
              value={assignment.points}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  points: parseInt(e.target.value) || 0,
                })
              }
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Assignment Group
          </FormLabel>
          <Col sm={9}>
            <FormSelect id="wd-assignment-group" defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Display Grade as
          </FormLabel>
          <Col sm={9}>
            <FormSelect id="wd-display-grade-as" defaultValue="Percentage">
              <option value="Percentage">Percentage</option>
              <option value="Points">Points</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="mb-4">
          <FormLabel column sm={3} className="text-end">
            Submission Type
          </FormLabel>
          <Col sm={9}>
            <div className="border rounded p-4 mt-3">
              <FormSelect id="wd-submission-type" defaultValue="Online" className="mb-3">
                <option value="Online">Online</option>
                <option value="In Person">In Person</option>
              </FormSelect>

              <div className="fw-bold mb-2">Online Entry Options</div>
              <FormCheck id="wd-text-entry" label="Text Entry" className="mb-2" />
              <FormCheck id="wd-website-url" label="Website URL" defaultChecked className="mb-2" />
              <FormCheck id="wd-media-recordings" label="Media Recordings" className="mb-2" />
              <FormCheck id="wd-student-annotation" label="Student Annotation" className="mb-2" />
              <FormCheck id="wd-file-uploads" label="File Uploads" />
            </div>
          </Col>
        </Row>

        <Row className="mb-4">
          <FormLabel column sm={3} className="text-end">
            Assign
          </FormLabel>
          <Col sm={9}>
            <div className="border rounded p-3">
              <div className="fw-bold fs-5 mb-2">Assign to</div>
              <FormControl id="wd-assign-to" defaultValue="Everyone" />

              <FormLabel htmlFor="wd-due-date" className="fw-bold mt-3">
                Due
              </FormLabel>
              <FormControl
                type="datetime-local"
                id="wd-due-date"
                value={assignment.due}
                onChange={(e) =>
                  setAssignment({ ...assignment, due: e.target.value })
                }
                className="mb-3"
              />

              <Row>
                <Col>
                  <FormLabel htmlFor="wd-available-from" className="fw-bold">
                    Available from
                  </FormLabel>
                  <FormControl
                    type="datetime-local"
                    id="wd-available-from"
                    value={assignment.available}
                    onChange={(e) =>
                      setAssignment({ ...assignment, available: e.target.value })
                    }
                  />
                </Col>

                <Col>
                  <FormLabel htmlFor="wd-until" className="fw-bold">
                    Until
                  </FormLabel>
                  <FormControl
                    type="datetime-local"
                    id="wd-until"
                    value={assignment.until}
                    onChange={(e) =>
                      setAssignment({ ...assignment, until: e.target.value })
                    }
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <hr />
        <div className="float-end">
          {aid !== "new" && (
            <Button
              onClick={handleDelete}
              variant="danger"
              className="me-2"
            >
              Delete
            </Button>
          )}

          <Link
            href={`/courses/${cid}/assignments`}
            className="btn btn-secondary me-2"
          >
            Cancel
          </Link>

          <Button onClick={handleSave} variant="danger">
            Save
          </Button>
        </div>
        <div className="clearfix" />
      </Form>
    </div>
  );
}