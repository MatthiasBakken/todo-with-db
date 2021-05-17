import React, { useEffect } from 'react';


const TodoList = ( props ) => {
  const { setPageTitle } = props;

  useEffect( () => {
    setPageTitle( "MY TODO LIST" );
  }, [] );

  return (
    <div>
      Hi
    </div>
  );
};

export default TodoList;