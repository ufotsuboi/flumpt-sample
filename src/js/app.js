import * as React from "react";
import {Flux, Component} from "flumpt";
import {render} from "react-dom";

class MyComponent extends Component {
  componentDidMount() {
    this.dispatch("increment");
  }
  render() {
    console.log(this.props);
    return (
      <div>
      {this.props.count}
      <button onClick={() => this.dispatch("increment")}>increment</button>
      </div>
    );
  }
}

class App extends Flux {
  // `subscribe` is called once in constructor
  subscribe() {
    this.on("increment", () => {
      this.update(({count}) => {
        // return next state
        return {count: count + 1};
      });
    });
  }

  render(state) {
    return <MyComponent {...state}/>;
  }
}

// Setup renderer
const app = new App({
  renderer: el => {
    render(el, document.querySelector("#root"));
  },
  initialState: {count: 0},
  middlewares: [
    // logger
    //   it may get state before unwrap promise
    (state) => {
      console.log(state);
      return state
    }
  ]
});

app.on(":start-updating", () => {
  // overlay ui lock
});
app.on(":end-updating", () => {
  // hide ui lock
});

// it fires rendering
app.update(_initialState => ({count: 1}))
