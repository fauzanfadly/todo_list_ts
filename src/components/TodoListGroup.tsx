import React from 'react'
import { ListGroup } from 'react-bootstrap';
import TodoListGroupItem from "../components/TodoListGroupItem";
import { TodoModel } from "../models/TodoModel";
import { FormChangeHandlerModel } from '../models/FormChangeHandlerModel';


interface TodoListGroupProps {
  editForm: string;
  todoItems: Array<TodoModel>;
  onSelectTask: (value?: any) => void;
  onDeleteTask: (value?: any) => void;
  onEditMode: (index: number) => void;
  onChange: (data: FormChangeHandlerModel) => void;
  onSubmitEdit: (index: number) => void;
  onCancelEdit: (index: number) => void;
}


const TodoListGroup: React.FC<TodoListGroupProps> = ({
  editForm,
  todoItems,
  onSelectTask,
  onDeleteTask,
  onChange,
  onEditMode,
  onSubmitEdit,
  onCancelEdit
}) => {
  return(
    <ListGroup>
      { todoItems.map((item, index) => (
        <TodoListGroupItem
          key={index}
          todo={item}
          numberIndex={index + 1}
          editForm={editForm}
          onClick={() => onSelectTask(index)}
          onDelete={() => onDeleteTask(index)}
          onChange={onChange}
          onEditMode={() => onEditMode(index)}
          onSubmitEdit={() => onSubmitEdit(index)}
          onCancelEdit={() => onCancelEdit(index)}
        />
      )) }
    </ListGroup>
  )
}

export default TodoListGroup;
