import React, { useEffect } from 'react';

import { Formik, Form, Field } from 'formik';

import { TodoFormSchema } from "./TodoFormSchema";
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
          taskName: '',
          description: '',
          dateCreated: 0,
        }}
        validationSchema={TodoFormSchema}
        onSubmit={( values ) => {
          
        }}
      >
        {( { errors, touched, isValid, dirty } ) => (
          <Form className={`${TODO}form`} testid="todo-form">
            <label testid="taskname-label">Todo: </label>
            <Field
              name="taskName"
              className={`${TODO}input`}
              testid="taskname-input"
              placeholder="Do something"
            />
            {errors.taskName && touched.taskName ? (
              <div className="error-div" testid="taskname-error">{errors.taskName}</div>
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