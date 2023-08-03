import React, { useState } from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import TodoListGroup from "../components/TodoListGroup";
import ButtonMoreMenus from "../components/ButtonMoreMenus";
import TodoForm from "../components/TodoForm";
import { TodoModel } from "../models/TodoModel";
import { MenuModel } from "../models/MenuModel";
import { FormChangeHandlerModel } from "../models/FormChangeHandlerModel";


interface TodoListPageModel {
  dataForm?: TodoModel;
  todoItems?: Array<TodoModel>;
  editForm?: string;
}


const TodoListPage: React.FC = () => {

  const [data, setData] = useState<TodoListPageModel>({
    dataForm: { task: '' },
    todoItems: [],
    editForm: ''
  });

  const updateState = (value: TodoListPageModel) => {
    setData({ ...data, ...value });
  }

  const moreMenus: Array<MenuModel> = [
    { title: 'Select' }
  ];

  const completeTask = (index: number) => {
    const updatedData = [...(data.todoItems ?? [])];
    updatedData[index].isComplete = !updatedData[index].isComplete;
    updateState({ todoItems: updatedData });
  }

  const handleChange = (updatedData: FormChangeHandlerModel) => {
    const fieldName = updatedData.field ?? '';
    const value = updatedData.value;
    updateState({ dataForm: { [fieldName]: value } });
  }

  const setEditMode = (index: number) => {
    const todoItems = (data.todoItems ?? []).map((todo) => {
      return { ...todo, editMode: false }
    });
    todoItems[index].editMode = true;
    updateState({ todoItems: todoItems, editForm: todoItems[index].task });
  }

  const addTodo = () => {
    const updatedData = [...(data.todoItems ?? [])];
    const dataForm = {...trimmedTextDataForm()};

    updatedData.push({
      ...dataForm,
      isComplete: false,
      isSelected: false,
      editMode: false,
    });
    updateState({ todoItems: updatedData, dataForm: { task: '' } });
  }

  const deleteTask = (index: number) => {
    const updatedData = [...(data.todoItems ?? [])];
    updatedData.splice(index, 1);
    updateState({ todoItems: updatedData });
  }

  const submitEditTask = (index: number) => {
    const updatedData = [...(data.todoItems ?? [])];
    updatedData[index].task = data.editForm;
    updatedData[index].editMode = false;
    updateState({ todoItems: updatedData });
  }

  const cancelEditTask = (index: number) => {
    const updatedData = [...(data.todoItems ?? [])];
    updatedData[index].editMode = false;
    updateState({ todoItems: updatedData });
  }

  const onChangeEditForm = (updatedData: FormChangeHandlerModel) => {
    const fieldName = updatedData.field ?? '';
    const value = updatedData.value;
    updateState({ [fieldName]: value });
  }

  const trimmedTextDataForm = () => {
    const dataForm = {...(data.dataForm ?? {})};

    Object.keys(dataForm).map((key) => {
      const value = dataForm[key as keyof TodoModel];
      if (typeof value === 'string') {
        value.trim();
      }
      return null;
    });

    return dataForm;
  }


  return (
    <Container>
      <Row className='mt-5'>
        <Col>
          <TodoForm
            formData={data.dataForm ?? {}}
            onSubmit={(_) => addTodo()}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col>
          <Card>
            <Card.Header>
              <Container>
                <Row className='justify-content-between align-items-center '>
                  <Col md='auto'>
                    <p className='mb-0 h5'>Tasks List</p>
                  </Col>
                  <Col md='auto'>
                    <ButtonMoreMenus
                      menus={moreMenus}
                    />
                  </Col>
                </Row>
              </Container>
            </Card.Header>
            <Card.Body>
              {
                (data.todoItems ?? []).length > 0
                ? <TodoListGroup
                  editForm={data.editForm ?? ''}
                  todoItems={data.todoItems ?? []}
                  onSelectTask={(index) => completeTask(index)}
                  onDeleteTask={(index) => deleteTask(index)}
                  onEditMode={setEditMode}
                  onChange={onChangeEditForm}
                  onSubmitEdit={submitEditTask}
                  onCancelEdit={cancelEditTask}
                />
                : <p className='m-0 py-2 h4 text-center text-secondary user-select-none'>You don't any work to do</p>
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TodoListPage;
