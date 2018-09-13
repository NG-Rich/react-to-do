import React, { Component } from 'react';
import ToDo from './components/ToDo.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { description: 'Walk the cat', isCompleted: true  },
        { description: 'Throw the dishes away', isCompleted: false  },
        { description: 'Buy new dishes', isCompleted: false }
      ],
      newTodoDescription: ''
    };
  }

  deleteTodo(todoIndex) {
    const filteredTodos = this.state.todos.filter((todo,i) => {
      return i != todoIndex;
    });

    this.setState({ todos: filteredTodos });
  }

  handleChange(e) {
    this.setState({ newTodoDescription: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newTodoDescription) {return}
    const newTodo = { description: this.state.newTodoDescription, isCompleted: false };
    let todos = this.state.todos;
    todos.push(newTodo);
    this.setState({ todos: todos, newTodoDescription: ''  });
  }

  toggleComplete(index) {
    const todos = this.state.todos.slice();
    const todo = todos[index];

    todo.isCompleted = todo.isCompleted ? false : true;
    this.setState({ todos: todos });
  }

  render() {
    return (
      <div className="App">
        <ul>
          {this.state.todos.map( (todo, index) =>
            <ToDo
              key={ `todo-${index}` }
              description={ todo.description }
              isCompleted={  todo.isCompleted }
              deleteTodo={ () => this.deleteTodo(index) }
              toggleComplete={ () => this.toggleComplete(index) }
            />
          )}
        </ul>
        <form onSubmit={  (e) => this.handleSubmit(e) }>
          <input
            type='text'
            value={  this.state.newTodoDescription }
            onChange={ (e) => this.handleChange(e) }
          />
          <input type='submit' />
        </form>
      </div>
    );
  }
}

export default App;
