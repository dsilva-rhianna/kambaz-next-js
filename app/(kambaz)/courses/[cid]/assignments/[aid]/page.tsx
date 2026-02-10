import Link from "next/link";
import { Button, Col, Form, FormCheck, FormControl, FormLabel, FormSelect, Row } from "react-bootstrap";

export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <Form>
                <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
                <FormControl id="wd-name" defaultValue="A1" className="mb-3"/>
                <FormControl id="wd-description" as="textarea" rows={12} className="mb-4"
                    defaultValue={
                        "The assignment is available online\n\n" +
                        "Submit a link to the landing page of your Web application running on Netlify.\n\n" +
                        "The landing page should include the following:\n" +
                        "• Your full name and section\n" +
                        "• Links to each of the lab assignments\n" +
                        "• Link to the Kanbas application\n" +
                        "• Links to all relevant source code repositories\n\n" +
                        "The Kanbas application should include a link to navigate back to the landing page."
                    }/>

                <Row className="mb-3" controlId="wd-points">
                    <FormLabel column sm={3} className="text-end">
                        Points
                    </FormLabel>
                    <Col sm={9}>
                        <FormControl type="number" defaultValue={100} />
                    </Col>
                </Row>

                <Row className="mb-3" controlId="wd-assignment-group">
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

                <Row className="mb-3" controlId="wd-display-grade-as">
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

                <Row className="mb-3" controlId="wd-submission-type">
                    <FormLabel column sm={3} className="text-end">
                        Submission Type
                    </FormLabel>
                    <Col sm={9}>
                    <div className="border rounded p-3 mt-3">
                        <FormSelect id="wd-submission-type" defaultValue="Online">
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

                <Row className="mb-3" controlId="wd-assign-to">
                    <FormLabel column sm={3} className="text-end">
                        Assign
                    </FormLabel>
                    <Col sm={9}>
                        <div className="border rounded p-3">
                            <div className="fw-bold mb-2">Assign to</div>
                            <FormControl id="wd-assign-to" defaultValue="Everyone" />

                            <FormLabel htmlFor="wd-due-date" className="mt-3">
                                Due
                            </FormLabel>
                            <FormControl type="datetime-local" id="wd-due-date" defaultValue="2026-04-14T00:00" className="mb-3" />

                            <Row>
                                <Col>
                                <FormLabel htmlFor="wd-available-from">Available from</FormLabel>
                                <FormControl type="datetime-local" id="wd-available-from" defaultValue="2026-05-16T00:00"/>
                                </Col>
                                <Col>
                                <FormLabel htmlFor="wd-until">Until</FormLabel>
                                <FormControl type="datetime-local" id="wd-until" defaultValue="2026-05-16T23:59" />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <hr />
                <div className="float-end">
                    <Link href="/courses/1234/assignments" className="btn btn-secondary me-2">
                        Cancel
                    </Link>
                    <Button variant="danger">Save</Button>
                </div>
                <div className="clearfix" />
            </Form>
        </div>
    );
}
