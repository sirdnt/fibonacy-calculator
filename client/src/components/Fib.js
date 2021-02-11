import React, { Component } from 'react'
import axios from 'axios'

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    }

    componentDidMount() {
        this.fetchValues()
        this.fetchIndexes()
    }

    async fetchValues() {
        const values = await axios.get('api/values/current')
        this.setState({values: values.data})
        console.log(values.data);
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all')
        this.setState({seenIndexes: seenIndexes.data})
        console.log(seenIndexes.data);
    }

    renderSeenIndexes() {
        return this.state.seenIndexes.map((e) => e.number).join(', ')
    }

    renderCalculatedValues() {
        const entries = []
        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index {key} I calculated {this.state.values[key]}
                </div>
            )
        }
        return entries
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        await axios.post('/api/values', {
            index: this.state.index
        })
        this.setState({index: ''})
    }

    render() {
        return (
            <div>
                <form action="POST" onSubmit={this.handleSubmit}>
                    <label htmlFor="">Enter your index</label>
                    <input type="text" value={this.state.index} onChange={event=> this.setState({index: event.target.value})}/>
                    <button>Submit</button>
                </form>
                <h3>Indexes I have seen: </h3>
                {this.renderSeenIndexes()}
                <h3>Calculated values: </h3>
                {this.renderCalculatedValues()}
            </div>
        )
    }

}

export default Fib

