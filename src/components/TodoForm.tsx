import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { MdAdd } from "react-icons/md";
import { TodoModel } from "../models/TodoModel";
import { FormChangeHandlerModel } from "../models/FormChangeHandlerModel";


interface TodoFormProps {
  formData: TodoModel;
  onSubmit: (value?: any) => void;
  onChange: (data: FormChangeHandlerModel) => void;
}


const TodoForm: React.FC<TodoFormProps> = ({ formData, onSubmit, onChange }) => {

  const [errors, setErrors] = useState<Partial<TodoModel>>({});

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      field: event.target.name,
      value: event.target.value
    });
  }

  const handleOnSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (validate()) {
      onSubmit(event);
    }
  }

  const validate = () => {
    const newErrors: Partial<TodoModel> = {};

    if ((formData.task ?? '').trim() === '') {
      newErrors.task = 'Task cannot be empty!';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    } else {
      return true;
    }
  }

  return (
    <Card>
      <Card.Header>
        <p className='mb-0 h5'>Add New To Do</p>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="text"
              name="task"
              value={formData.task}
              onChange={handleOnChange}
              required
            />
            {errors.task && <Form.Text className="text-danger">{errors.task}</Form.Text>}
          </Form.Group>

          <Button variant='success' type='button' onClick={(e) => handleOnSubmit(e)}>
            <MdAdd size={20}></MdAdd> Add To Do
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default TodoForm;
