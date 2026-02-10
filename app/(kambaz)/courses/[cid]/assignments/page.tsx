import Link from "next/link";
import { Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical, BsSearch, BsCaretDownFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      {/* Controls Row (search + buttons) */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="position-relative" style={{ width: "320px" }}>
          <BsSearch className="position-absolute top-50 start-0 translate-middle-y ms-3" />
          <Form.Control
            placeholder="Search for Assignment"
            className="ps-5"
            style={{ height: "40px" }}
          />
        </div>

        <div className="d-flex align-items-center">
          <Button variant="secondary" className="me-2 text-nowrap">
            <FaPlus className="me-2" />
            Group
          </Button>

          <Button variant="danger" className="me-2 text-nowrap">
            <FaPlus className="me-2" />
            Assignment
          </Button>
        </div>
      </div>

      {/* Assignments Group */}
      <ListGroup className="rounded-0" id="wd-assignments-list">
        <ListGroupItem className="wd-module p-0 mb-4 fs-5 border-gray">
          {/* Header row (Modules-style) */}
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

          {/* Rows */}
          <ListGroup className="wd-lessons rounded-0">
            {/* A1 */}
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <FaRegEdit className="me-3 text-success" />

              <Link
                href="/courses/1234/assignments/123"
                className="fw-bold fs-5 text-decoration-none text-dark"
              >
                A1
              </Link>

              <span className="float-end">
                <BsCheckCircleFill className="text-success me-3 fs-5" />
                <IoEllipsisVertical className="fs-4" />
              </span>

              <div className="text-muted mt-1">
                <span className="text-danger">Multiple Modules</span> |
                <strong> Not available until</strong> May 6 at 12:00am |
                <strong> Due</strong> May 13 at 11:59pm | 100 pts
              </div>
            </ListGroupItem>

            {/* A2 */}
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <FaRegEdit className="me-3 text-success" />

              <Link
                href="/courses/1234/assignments/123"
                className="fw-bold fs-5 text-decoration-none text-dark"
              >
                A2
              </Link>

              <span className="float-end">
                <BsCheckCircleFill className="text-success me-3 fs-5" />
                <IoEllipsisVertical className="fs-4" />
              </span>

              <div className="text-muted mt-1">
                <span className="text-danger">Multiple Modules</span> |
                <strong> Not available until</strong> May 13 at 12:00am |
                <strong> Due</strong> May 20 at 11:59pm | 100 pts
              </div>
            </ListGroupItem>

            {/* A3 */}
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <FaRegEdit className="me-3 text-success" />

              <Link
                href="/courses/1234/assignments/123"
                className="fw-bold fs-5 text-decoration-none text-dark"
              >
                A3
              </Link>

              <span className="float-end">
                <BsCheckCircleFill className="text-success me-3 fs-5" />
                <IoEllipsisVertical className="fs-4" />
              </span>

              <div className="text-muted mt-1">
                <span className="text-danger">Multiple Modules</span> |
                <strong> Not available until</strong> May 20 at 12:00am |
                <strong> Due</strong> May 27 at 11:59pm | 100 pts
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
