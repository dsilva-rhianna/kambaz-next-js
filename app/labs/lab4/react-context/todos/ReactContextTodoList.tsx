"use client";

import { useState } from "react";
import { FormControl, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { useTodos } from "./todosContext";

export default function ReactContextTodoList() {
  const { todos, addTodo, deleteTodo, updateTodo } = useTodos();
  const [todo, setTodo] = useState({ id: "-1", title: "" });

  return (
    <div id="wd-react-context-todo-list">
      <h2>React Context Todo List</h2>
      <ListGroup>
        <ListGroupItem className="d-flex align-items-center">
          <FormControl
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            placeholder="Todo title"
            className="w-75 me-2"
          />
          <Button
            onClick={() => {
              updateTodo(todo);
              setTodo({ id: "-1", title: "" });
            }}
            id="wd-update-todo-click"
            className="btn btn-warning me-2 ms-auto"
          >
            Update
          </Button>
          <Button
            onClick={() => {
              addTodo(todo);
              setTodo({ id: "-1", title: "" });
            }}
            id="wd-add-todo-click"
            className="btn btn-success me-2"
          >
            Add
          </Button>
        </ListGroupItem>
        {todos.map((td) => (
          <ListGroupItem key={td.id} className="d-flex align-items-center">
            <span className="flex-grow-1">{td.title}</span>
            <Button
              onClick={() => setTodo(td)}
              id="wd-set-todo-click"
              className="btn btn-primary me-2"
            >
              Edit
            </Button>
            <Button
              onClick={() => deleteTodo(td.id)}
              id="wd-delete-todo-click"
              className="btn btn-danger me-2"
            >
              Delete
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}