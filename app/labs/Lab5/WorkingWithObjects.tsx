"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const [module, setModule] = useState({
    id: "M101",
    name: "React Fundamentals",
    description: "Introduction to React components, JSX, and props.",
    course: "1234",
  });
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;
  return (
    <div>
      <h3 id="wd-working-with-objects">Working With Objects</h3>
      <h4>Assignment</h4>
      <h5>Modifying Properties</h5>
      <div className="mb-2">
        <a id="wd-update-assignment-title"
          className="btn btn-primary float-end"
          href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
          Update Title </a>
        <FormControl className="w-75" id="wd-assignment-title"
          defaultValue={assignment.title} onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })}/>
      </div>
      <div className="mb-2">
        <a id="wd-update-assignment-score"
          className="btn btn-primary float-end"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
          Update Score </a>
        <FormControl className="w-75" id="wd-assignment-score"
          type = "number"
          defaultValue={assignment.score} onChange={(e) =>
            setAssignment({ ...assignment, score: parseInt(e.target.value) })}/>
      </div>
      <div className="mb-2">
        <a id="wd-update-assignment-completed"
          type = "checkbox"
          className="btn btn-primary float-end"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
          Update Completed </a>
        <input className="form-check-input" id="wd-assignment-completed"
          type="checkbox"
          checked={assignment.completed} onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })}/>
      </div>
      <hr />
      <h5>Retrieving Objects</h5>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>
      <h5>Retrieving Properties</h5>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment/title`}>
        Get Title
      </a>
      <a id="wd-retrieve-assignment-score" className="btn btn-primary ms-2"
         href={`${HTTP_SERVER}/lab5/assignment/score`}>
        Get Score
      </a>
      <a id="wd-retrieve-assignment-completed" className="btn btn-primary ms-2"
         href={`${HTTP_SERVER}/lab5/assignment/completed`}>
        Get Completed
      </a>
      <hr/>
      
      <h4>Module</h4>
      <h5>Retrieving Objects</h5>
      <a id="wd-retrieve-module"
        className="btn btn-primary"
        href={`${MODULE_API_URL}`}>
        Get Module
      </a> <hr />
      <h5>Retrieving Properties</h5>
      <a id="wd-retrieve-module-name"
        className="btn btn-primary me-2"
        href={`${MODULE_API_URL}/name`}>
        Get Module Name
      </a>
      <a id="wd-retrieve-module-description"
        className="btn btn-primary me-2"
        href={`${MODULE_API_URL}/description`}>
        Get Module Description
      </a>
      <hr />
      <h5>Modifying Module Properties</h5>
      <div className="mb-2">
        <a id="wd-update-module-name"
          className="btn btn-primary float-end"
          href={`${MODULE_API_URL}/name/${module.name}`}>
          Update Module Name
        </a>
        <FormControl id="wd-module-name"
          className="w-75"
          defaultValue={module.name}
          onChange={(e) => setModule({ ...module, name: e.target.value })}/>
      </div>

      <div className="mb-2">
        <a id="wd-update-module-description"
          className="btn btn-primary float-end"
          href={`${MODULE_API_URL}/description/${module.description}`}>
          Update Module Description
        </a>
        <FormControl id="wd-module-description"
          className="w-75"
          defaultValue={module.description}
          onChange={(e) => setModule({ ...module, description: e.target.value })}/>
      </div> <hr />
    </div>
);}
