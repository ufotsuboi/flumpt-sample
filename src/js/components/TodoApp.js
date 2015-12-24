import * as React from "react";
import {Component} from "flumpt";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default class TodoApp extends Component {
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
