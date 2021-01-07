import React, { Component } from 'react'
import Counter from './pages/Counter';

export default class App extends Component {
    constructor(props) {
        super();
    }
    render() {
        return (
          <Counter></Counter>
        )
    }
}
