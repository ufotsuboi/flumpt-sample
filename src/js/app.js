import * as React from "react";
import {Flux, Component} from "flumpt";
import {render, findDOMNode} from "react-dom";

class TodoApp extends Component {
  render() {
    return (
      <div className="todoApp">
        <h1>TODO Application</h1>
        <TodoForm {...this.props} />
        <TodoList {...this.props} />
      </div>
    );
  }
}

class TodoForm extends Component {
  handleSubmit(e) {
    e.preventDefault();
    const name = findDOMNode(this.refs.name);
    console.log(name.value)
    if (name.value !== '') {
      this.dispatch("add", name.value);
    }
    name.value = '';
  }

  render() {
    return (
      <form className="todoForm" onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder="TODOを入力..." ref="name" />
        <button type="submit">作成</button>
      </form>
    )
  }
}

class TodoList extends Component {
  render() {
    var todos = this.props.todos.map((todo) => {
      return <Todo key={todo.id} id={todo.id} created_at={todo.created_at} onTodoDestroy={this.props.onTodoDestroy}>{todo.name}</Todo>;
    });
    return (
      <div className="todoList">
        {todos}
      </div>
    )
  }
}

class Todo extends Component {
  handleDestroy() {
    this.dispatch("destroy", this.props.id);
  }

  render() {
    return (
      <div className="todo">
        <span className="name">{this.props.children}</span>
        <span className="date">{this.props.created_at}</span>
        <button onClick={this.handleDestroy.bind(this)}>削除</button>
      </div>
    )
  }
}

class App extends Flux {
  // `subscribe` is called once in constructor
  subscribe() {
    this.on("add", (name) => {
      var todo = {
        id: (Date.now() + Math.floor(Math.random() * 999999)).toString(36),
        name: name,
        created_at: (new Date()).toLocaleString()
      };
      this.update(({todos}) => {
        // return next state
        return {todos: todos.concat([todo])};
      });
    });

    this.on("destroy", (id) => {
      this.update(({todos}) => {
        var newTodos = todos.filter(function(todo) { return todo.id == id ? false : true });
        return({ todos: newTodos });
      });
    });
  }

  render(state) {
    return <TodoApp {...state}/>;
  }
}

// Setup renderer
const app = new App({
  renderer: el => {
    render(el, document.querySelector("#root"));
  },
  initialState: {todos: []},
  middlewares: [
    // logger
    //   it may get state before unwrap promise
    (state) => {
      console.log(state);
      return state
    }
  ]
});

// it fires rendering
app.update(_initialState => ({todos: []}))
