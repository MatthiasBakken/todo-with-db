import React, { useEffect } from 'react';


const Todo = ( props ) => {
  const { setPageTitle } = props;

  useEffect( () => {
    setPageTitle( "TODO" );
  }, [] );

  return (
    <div>
      Hello
    </div>
  )
}

export default Todo;