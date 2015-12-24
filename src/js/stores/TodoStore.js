import * as React from "react";
import {Flux, Component} from "flumpt";
import TodoApp from "../components/TodoApp";

export default class TodoStore extends Flux {
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
