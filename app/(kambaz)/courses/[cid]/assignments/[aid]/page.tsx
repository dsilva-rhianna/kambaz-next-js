"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button, Col, Form, FormCheck, FormControl, FormLabel, FormSelect, Row } from "react-bootstrap";
import * as db from "../../../../database";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const assignments = db.assignments;
    const assignment = assignments.find((a: any) => a._id === aid);

    return (
        <div id="wd-assignments-editor">
            <Form>
                <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
                <FormControl id="wd-name" defaultValue={assignment?.title} className="mb-3"/>
                <FormControl id="wd-description" as="textarea" rows={12} className="mb-4"
                    defaultValue={assignment?.description}/>

                <Row className="mb-3" controlid="wd-points">
                    <FormLabel column sm={3} className="text-end">
                        Points
                    </FormLabel>
                    <Col sm={9}>
                        <FormControl type="number" defaultValue={assignment?.points} />
                    </Col>
                </Row>

                <Row className="mb-3" controlid="wd-assignment-group">
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

                <Row className="mb-3" controlid="wd-display-grade-as">
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

                <Row className="mb-4" controlid="wd-submission-type">
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

                <Row className="mb-4" controlid="wd-assign-to">
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
                            <FormControl type="datetime-local" id="wd-due-date" defaultValue={assignment?.due?.replace(/-/g, "-") + "T23:59"} className="mb-3" />
                            <Row>
                                <Col>
                                <FormLabel htmlFor="wd-available-from" className="fw-bold">Available from</FormLabel>
                                <FormControl type="datetime-local" id="wd-available-from" defaultValue={assignment?.available?.replace(/-/g, "-") + "T00:00"}/>
                                </Col>
                                <Col>
                                <FormLabel htmlFor="wd-until" className="fw-bold">Until</FormLabel>
                                <FormControl type="datetime-local" id="wd-until" defaultValue={assignment?.due?.replace(/-/g, "-") + "T23:59"} />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <hr />
                <div className="float-end">
                    <Link href={`/courses/${cid}/assignments`} className="btn btn-secondary me-2">
                        Cancel
                    </Link>
                    <Link href={`/courses/${cid}/assignments`} className="btn btn-danger">
                        Save
                    </Link>
                </div>
                <div className="clearfix" />
            </Form>
        </div>
    );
}