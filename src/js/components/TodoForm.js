import * as React from "react";
import {Component} from "flumpt";
import {findDOMNode} from "react-dom";

export default class TodoForm extends Component {
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
