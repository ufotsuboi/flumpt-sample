import * as React from "react";
import {Component} from "flumpt";

export default class Todo extends Component {
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
