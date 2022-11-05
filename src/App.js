import React, { useState, useEffect } from 'react';
import "./App.css";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div className="todo" >
      <span >{todo.text}</span>
      <div>
        <Button style={{ backgroundColor: todo.isDone ? "#198754" : "" , color: todo.isDone ? "#fff" : "" }} variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
    <Form.Label><b>Add To-do</b></Form.Label> 
    <Form.Group className="formGroup">
      <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new to-do" />
      <Button variant="primary mb-3" type="submit">
      Submit
      </Button>
    </Form.Group>
  </Form>
  );
}

function App() {
  const [todos, setTodos] = useState([
    { text: "This is a sampe to-do", isDone: false },
    { text: "This is a sampe to-do", isDone: true },
    { text: "This is a sampe to-do", isDone: false },
    { text: "This is a sampe to-do", isDone: true }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };


  // func dark
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);
  // func dark


  return (
    <div className={`App ${theme}`}>
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">To-do List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
        <Button onClick={toggleTheme} variant="secondary">Switch Theme</Button>{' '}
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>  
                <Todo
                key={index}
                index={index}
                todo={todo}
                markTodo={markTodo}
                removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;