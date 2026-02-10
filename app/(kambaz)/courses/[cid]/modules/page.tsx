import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./modulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

export default function Modules() {
    return (
        <div>
            <ModulesControls /><br /><br /><br /><br />
            <ListGroup className="rounded-0" id="wd-modules">
                <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" /> Week 1, Lecture 1 - Course Introduction <ModuleControlButtons />
                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Introduction to the course <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Learn what is Web Development <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> READING <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Developing Web Applications - Chapter 1 - React User Interfaces with HTML <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Developing Web Applications - Chapter 2 - Styling Web Pages with CSS <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> SLIDES <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Learning Objectives <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Setting Up the Development Environment <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Introduction to HTML <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Creating a React Application <LessonControlButtons />
                        </ListGroupItem>
                    </ListGroup>
                </ListGroupItem>

                <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" /> Week 1, Lecture 2 - Formatting User Interfaces <ModuleControlButtons />
                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Learn how to create user interfaces with HTML <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Deploy the assignment to Netflify <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> SLIDES <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Introduction to the DOM <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Formatting web content with lists and tables <LessonControlButtons />
                        </ListGroupItem>
                    </ListGroup>
                </ListGroupItem>

                <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" /> Week 2, Lecture 1 - Kambaz Introduction <ModuleControlButtons />
                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Start implementing the Kambaz Web Application <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Update Vercel deployment <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> READING <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Developing Web Applications - Chapter 3 - Single Page Applications with React <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Developing Web Applications - Chapter 4 - Maintaining State in React Applications <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> SLIDES <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Implementing the Kambaz Account Screens <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Implementing the Kambaz Dashboard Screen <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Implementing the Kambaz Courses Screen <LessonControlButtons />
                        </ListGroupItem>
                    </ListGroup>
                </ListGroupItem>

                <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" /> Week 2, Lecture 2 - Styling Web Pages with CSS and Bootstrap <ModuleControlButtons />
                    </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Introduction to CSS <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Styling dimensions and positions <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> SLIDES <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Introduction to Cascading Style Sheets <LessonControlButtons />
                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> The Box Model <LessonControlButtons />
                        </ListGroupItem>
                    </ListGroup>
                </ListGroupItem>

                <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" /> Week 3 <ModuleControlButtons />
                    </div>
                </ListGroupItem>
            </ListGroup>
        </div>
    );
}