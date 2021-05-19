import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";

import Header from './components/Header';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Todo from './components/Todo';
import Menu from './components/Menu';

import './App.css';



function App() {
  const [ title, setTitle ] = useState( "MY TODO LIST" );
  
  return (
    <div className="App">
      <Header pageTitle={title} setPageTitle={setTitle} />
      <Menu />
      <Switch >
        <Route exact path="/">
          <TodoList setPageTitle={setTitle} />
        </Route>
        <Route path="/create-todo">
          <TodoForm setPageTitle={setTitle} />
        </Route>
        <Route path="/:id" >
          <Todo setPageTitle={setTitle} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
