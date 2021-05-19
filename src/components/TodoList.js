import React, { useEffect, useState } from 'react';
import axios from 'axios';


const LIST = "todo-list__";

const TodoList = ( props ) => {
  const { setPageTitle } = props;
  const [ todos, setTodos ] = useState( [] );
  const [ subtasks, setSubtasks ] = useState( [] );

  const getTodos = async () => {
    await axios.get( "http://localhost:5000/todos" )
      .then( res => {
        console.log( 'response', res.data.todos );
        setTodos( res.data.todos );
        setSubtasks( res.data.subtasks );
      } )
      .catch( err => {
        console.error( err.message );
      })
  };

  useEffect( () => {
    setPageTitle( "MY TODO LIST" );

    getTodos();
  }, [] );

  const handleDelete = async ( taskId, subtasksIds ) => {
    console.log( 'delete subtaskids', subtasksIds );
    await axios.delete( `http://localhost:5000/todos/${taskId}`, {
      subtasksids: [...subtasksIds]
    } )
      .then( res => {
        console.log( res.data );
        window.location.reload();
      } )
      .catch( err => {
        console.error( err.message );
      } );
    }

  const handleCompleted = ( taskId, completeStatus ) => {
    let index = todos.find( todo => todo.id == taskId );
    axios.put( `http://localhost:5000/todos/${taskId}`, {
      completed: !completeStatus
    } )
      .then( res => {
        console.log( res.data );
        let tempTodos = [...todos];
        tempTodos.forEach( todo => {
          if ( todo.id === taskId ) {
            todo.completed = !todo.completed;
          }
        })
        setTodos( tempTodos );
      } )
      .catch( err => {
        console.error( err.message );
      } );
  }

  console.log( 'subtask state', subtasks );
  console.log( 'todos state', todos );

  return (
    <div className={`${LIST}container`} testid="list-container">
      {
        todos.map( todo => {
          return (
            <div key={`${todo.id}`} className={`${LIST}task`}>
              <h1>{`${todo.name}`}</h1>
              <div>
                <p>{`${todo.description}`}</p>
                <ul>
                  {
                    todo.subtasksids.map( id => {
                      let subtasksArr = [];
                      subtasks.map( subtask => {
                        if ( id === subtask.id ) {
                          subtasksArr.push(<li key={`${subtask.id}`}>{`${subtask.description}`}</li>)
                        }
                      } )
                      return (
                        subtasksArr
                      )
                    } )
                  }
                </ul>
              </div>
              <span>
                <button onClick={() => handleCompleted(todo.id, todo.completed)}>{todo.completed ? "COMPLETED" : "<-- DO"}</button>
                <button onClick={() => handleDelete(todo.id, todo.subtasksids)}>DELETE</button>
              </span>
            </div>
          )
        })
      }
    </div>
  );
};

export default TodoList;