import { Button, ListGroupItem } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex align-items-center" key={todo.id}>
      <span className="flex-grow-1">{todo.title}</span>
      <Button className="me-2 btn-primary" onClick={() => dispatch(setTodo(todo))}
              id="wd-set-todo-click"> Edit </Button>
      <Button className="me-2 btn-danger" onClick={() => dispatch(deleteTodo(todo.id))}
              id="wd-delete-todo-click"> Delete </Button>
      </ListGroupItem>);}
