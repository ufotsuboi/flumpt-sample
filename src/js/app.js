import * as React from "react";
//import {Flux, Component} from "flumpt";
import {render} from "react-dom";
import TodoStore from "./stores/TodoStore";

// Setup renderer
const app = new TodoStore({
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
