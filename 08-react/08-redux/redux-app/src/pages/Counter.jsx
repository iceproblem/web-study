import React, { Component } from 'react'

import Add from '../components/Add'
import Show from '../components/Show'
import Sub from '../components/Sub'

export default class Counter extends Component {
    render() {
        return (
            <div>
                <Show></Show>
                <p>
                    <Add></Add>
                    <Sub></Sub>
                </p>
            </div>
        )
    }
}
