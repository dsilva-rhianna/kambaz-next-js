import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { ListGroup, ListGroupItem } from "react-bootstrap";
export default function ArrayStateVariable() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);
  return (
    <div id="wd-array-state-variables">
    <h2>Array State Variable</h2>
    <ListGroup>
          {todos.map((todo: any) => (
            <ListGroupItem key={todo.id}>
              {todo.title}
            </ListGroupItem>
          ))}
        </ListGroup>
        <hr />
    </div>);}

