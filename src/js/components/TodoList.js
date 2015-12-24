import * as React from "react";
import {Component} from "flumpt";
import Todo from "./Todo";

export default class TodoList extends Component {
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
