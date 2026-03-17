"use client";

import { useState } from "react";
import { FormControl, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { useTodoStore, Todo } from "./useTodoStore";

export default function ZustandTodoList() {
  const { todos, addTodo, deleteTodo, updateTodo } = useTodoStore();
  const [todo, setTodo] = useState<Todo>({ id: "-1", title: "" });

  return (
    <div id="wd-zustand-todo-list">
      <h2>Zustand Todo List</h2>
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
            variant="warning"
            className="me-2 ms-auto"
            id="wd-zustand-update-todo"
          >
            Update
          </Button>
          <Button
            onClick={() => {
              addTodo(todo);
              setTodo({ id: "-1", title: "" });
            }}
            variant="success"
            id="wd-zustand-add-todo"
          >
            Add
          </Button>
        </ListGroupItem>

        {todos.map((td) => (
          <ListGroupItem key={td.id} className="d-flex align-items-center">
            <span className="flex-grow-1">{td.title}</span>
            <Button
              onClick={() => setTodo(td)}
              variant="primary"
              className="me-2"
              id="wd-zustand-edit-todo"
            >
              Edit
            </Button>
            <Button
              onClick={() => deleteTodo(td.id)}
              variant="danger"
              id="wd-zustand-delete-todo"
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