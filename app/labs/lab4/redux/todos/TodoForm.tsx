import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex align-items-center">
        <FormControl className="me-2" value={todo.title} style={{ width: "75%" }}
          onChange={ (e) => dispatch(setTodo({ ...todo, title: e.target.value })) }/>
        <div className="ms-auto">
          <Button className="me-2 btn-warning" onClick={() => dispatch(updateTodo(todo))}
                id="wd-update-todo-click"> Update </Button>
          <Button className="me-2 btn-success" onClick={() => dispatch(addTodo(todo))}
                id="wd-add-todo-click"> Add </Button>
        </div>
    </ListGroupItem>
);}

