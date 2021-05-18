DROP DATABASE todolist;
CREATE DATABASE todolist;

\c todolist

CREATE TABLE todo(
  id VARCHAR(255),
  name VARCHAR(255),
  description VARCHAR(255),
  completed BOOLEAN,
  subtasksIds VARCHAR(255)[]
);

CREATE TABLE subtasks(
  id VARCHAR(255),
  description VARCHAR(255),
  completed BOOLEAN
);