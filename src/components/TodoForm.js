import React, { useEffect } from 'react';

import { Formik, Form, Field } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { TodoFormSchema } from "./TodoFormSchema";
import axios from 'axios';

import './TodoForm.css';


const TODO = 'todo__';

const TodoForm = ( props ) => {

  const { setPageTitle } = props;

  useEffect( () => {
    setPageTitle( "CREATE A NEW TODO" );
  }, [] );
  
  return (
    <div className={`${TODO}form-container`} testid="form-container">
      <Formik
        initialValues={{
          id: '',
          name: '',
          description: '',
          completed: false,
          subtasks: ''
        }}
        validationSchema={TodoFormSchema}
        onSubmit={( values ) => {
          const tempId = uuidv4();
          let subtaskIdsArr = [];
          let subtasksArr = [];
          values.subtasks.split( ',' ).forEach( subtask => {
            let tempId = uuidv4();
            subtasksArr.push( {
              id: tempId,
              description: subtask,
              completed: false
            } );
            subtaskIdsArr.push( tempId );
          } );
          axios.post( 'http://localhost:5000/todos', {
            id: tempId,
            name: values.name,
            description: values.description,
            completed: false,
            subtasksIds: subtaskIdsArr,
            subtasks: subtasksArr
          } )
            .then( res => {
              console.log( res );
            } )
            .catch( err => {
              console.error( err.message );
            } );
        }}
      >
        {( { errors, touched, isValid, dirty } ) => (
          <Form className={`${TODO}form`} testid="todo-form">
            <label testid="name-label">Todo: </label>
            <Field
              name="name"
              className={`${TODO}input`}
              testid="name-input"
              placeholder="Do something"
            />
            {errors.name && touched.name ? (
              <div className="error-div" testid="name-error">{errors.name}</div>
            ) : null}
            <label testid="description-label">Description: </label>
            <Field
              name="description"
              className={`${TODO}input`}
              testid="description-input"
              placeholder="Walk over to shelf and grab a book to read"
            />
            {errors.description && touched.description ? (
              <div className="error-div" testid="description-error">{errors.description}</div>
            ) : null}
            <label testid="subtasks-label">Subtasks (Separate by comma): </label>
            <Field
              name="subtasks"
              className={`${TODO}input`}
              testid="subtasks-input"
              placeholder="Get up, Walk over to shelf, Pick a book, Go sit down, Read the book"
            />
            {errors.subtasks && touched.subtasks ? (
              <div className="error-div" testid="subtasks-error">{errors.subtasks}</div>
            ) : null}
            <span className={`${TODO}button-container`} testid="form-btn-container">
              <button
                className={`${TODO}submit-btn`}
                type="submit"
                disabled={!( dirty && isValid )}
                testid="form-submit-btn"
              >
                ADD TODO
              </button>
            </span>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default TodoForm;