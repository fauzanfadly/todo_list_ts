import React, { useState } from 'react';
import { ListGroup, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { MdDelete, MdEdit } from "react-icons/md";
import { TodoModel } from "../models/TodoModel";
import styles from "../styles/todo_list_group_item.module.css";
import { FormChangeHandlerModel } from '../models/FormChangeHandlerModel';


interface TodoListGroupItemProps {
  todo: TodoModel;
  editForm: string;
  numberIndex?: number;
  onClick?: (value?: any) => void;
  onDelete?: (value?: any) => void;
  onEditMode?: (value?: any) => void;
  onSubmitEdit: (value?: any) => void;
  onCancelEdit: (value?: any) => void;
  onChange: (data: FormChangeHandlerModel) => void;
}

interface TodoListGroupItemModel {
  itemIsHover?: boolean;
  iconButtonIsHover?: IconButtons;
}

interface IconButtons {
  delete?: boolean;
  edit?: boolean;
}


const TodoListGroupItem: React.FC<TodoListGroupItemProps> = ({
  todo,
  numberIndex,
  editForm,
  onClick,
  onDelete,
  onEditMode,
  onSubmitEdit,
  onCancelEdit,
  onChange
}) => {

  const [data, setData] = useState<TodoListGroupItemModel>({
    itemIsHover: false,
    iconButtonIsHover: {
      delete: false,
      edit: false
    }
  });

  const [errors, setErrors] = useState<Partial<TodoModel>>({});

  const updateState = (value: TodoListGroupItemModel) => {
    setData({ ...data, ...value});
  }

  const setHoverStatus = (value: boolean) => {
    updateState({ itemIsHover: value });
  }

  const handleOnClick = () => {
    const iconButtonIsHover = checkAllIconButtonsHovered();
    if (!iconButtonIsHover && !todo.editMode && onClick) {
      onClick();
    }
  }

  const handleOnDelete = () => {
    hoverFocusToIconButton('delete', false);
    if (onDelete) {
      onDelete();
    }
  }

  const handleEditMode = () => {
    hoverFocusToIconButton('edit', false);
    if (onEditMode) {
      onEditMode();
    }
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      field: event.target.name,
      value: event.target.value
    });
  }

  const handleSubmitEdit = (saving: boolean) => {
    if (saving) {
      if (validate()) {
        onSubmitEdit();
      }
    } else {
      setErrors({});
      onCancelEdit();
    }
  }

  const hoverFocusToIconButton = (buttonName: string, value: boolean) => {
    const iconButtonIsHover = data.iconButtonIsHover ?? {};
    updateState({
      itemIsHover: !value,
      iconButtonIsHover: {
        ...iconButtonIsHover,
        [buttonName]: value
      }
    });
  }

  const checkAllIconButtonsHovered = () => {
    let isHovered = false;
    const iconButtonIsHover = {...data.iconButtonIsHover};

    Object.keys(iconButtonIsHover).map((key) => {
      const value = iconButtonIsHover[key as keyof IconButtons];
      if (value) {
        isHovered = true;
      }
      return null;
    });

    return isHovered;
  }

  const validate = () => {
    const newErrors: Partial<TodoModel> = {};

    if (editForm.trim() === '') {
      newErrors.task = 'Task cannot be empty!';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    } else {
      return true;
    }
  }


  return (!todo.editMode
    ? <ListGroup.Item
      variant={todo.isComplete ? 'success' : ''}
      className={`
        cursor-pointer
        rounded-0
        ${todo.isComplete ? '' : styles['todo-item-hover']}
        ${todo.isComplete ? '' : (data.itemIsHover ? styles['todo-item-hover-active'] : '')}
      `}
      onMouseEnter={() => setHoverStatus(true)}
      onMouseLeave={() => setHoverStatus(false)}
      onClick={() => handleOnClick()}
    >
      <Container>
        <Row className='justify-content-between align-items-center'>
          <Col className='px-0'>
            <p
              className={`
                m-0
                ${todo.isComplete ? 'fw-medium' : (data.itemIsHover ? 'fw-medium' : '')}
              `}
            >
              {numberIndex}. {todo.task}
            </p>
          </Col>
          <Col md='auto' className='px-0'>
            <Button
              variant='outline-danger'
              className='rounded-circle py-0 px-1 pb-1 border-0 me-1'
              onMouseEnter={() => hoverFocusToIconButton('delete', true)}
              onMouseLeave={() => hoverFocusToIconButton('delete', false)}
              onClick={() => handleOnDelete()}
            >
              <MdDelete size={20}></MdDelete>
            </Button>
            <Button
              variant='outline-info'
              className='rounded-circle py-0 px-1 pb-1 border-0'
              onMouseEnter={() => hoverFocusToIconButton('edit', true)}
              onMouseLeave={() => hoverFocusToIconButton('edit', false)}
              onClick={() => handleEditMode()}
            >
              <MdEdit size={20}></MdEdit>
            </Button>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
    : <ListGroup.Item
      variant={todo.isComplete ? 'success' : ''}
      className='rounded-0'
    >
      <Container>
        <Row className='mb-3 align-items-center'>
          <Col md='auto' className='ps-0'>
            <p className='m-0 h5 fw-medium'>{numberIndex}.</p>
          </Col>
          <Col className='px-0'>
            <Form.Control
              type="text"
              name="editForm"
              value={editForm}
              onChange={handleOnChange}
              required
            />
            {errors.task && <Form.Text className="text-danger">{errors.task}</Form.Text>}
          </Col>
        </Row>
        <Row>
          <Col md={6} className='ps-0'>
            <Button variant='danger' className='w-100' onClick={() => handleSubmitEdit(false)}>Cancel</Button>
          </Col>
          <Col md={6} className='pe-0'>
            <Button variant='success' className='w-100' onClick={() => handleSubmitEdit(true)}>Save</Button>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  );
}

export default TodoListGroupItem;
