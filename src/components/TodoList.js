import React, { useEffect, useState } from 'react';
import axios from 'axios';


const LIST = "todo-list__";

const TodoList = ( props ) => {
  const { setPageTitle } = props;
  // const [ todos, setTodos ] = useState( [] );
  // const [ subtasks, setSubtasks ] = useState( [] );

  useEffect( () => {
    setPageTitle( "MY TODO LIST" );

    const getTodos = async () => {
      await axios.get( "http://localhost:5000/todos" )
        .then( res => {
          console.log( 'response', res.data );
        } )
        .catch( err => {
          console.error( err.message );
        })
    };
    getTodos();
  }, [] );

  return (
    <div className={`${LIST}container`} testid="list-container">
      {/* {
        todos ?
          todos.map( todo => {
            return (
              <div key={todo.id} >
                <p>{`${todo.name}`}</p>
                <p>{`${todo.description}`}</p>
                <ul>
                  
                </ul>
              </div>
            );
          } )
          :
          <div>
            hello
          </div>
      } */}
    </div>
  );
};

export default TodoList;