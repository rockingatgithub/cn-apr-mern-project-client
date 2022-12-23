import { Component } from "react";

class App2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            heading: 'Class Component!',
            list: ['Vishal', 'Akash', 'Priyanshu', 'Me', 'CN', 'Shivani'],
            counter: 0,
        }
    }

    changeHandler = () => {

        this.setState({ heading: 'Class Component Heading!' })

    }

    incrementHandler = () => {
        this.setState((prevState) => ({ counter: prevState.counter + 1 }))
        this.setState((prevState) => ({ counter: prevState.counter + 2 }))
        this.setState((prevState) => ({ counter: prevState.counter + 3 }))

    }

    decrementHandler = () => {
        this.setState({ counter: this.state.counter - 1 })
        this.setState({ counter: this.state.counter - 2 })
        this.setState({ counter: this.state.counter - 3 })

    }


    render() {
        return <div>
            <h1>{this.state.heading}</h1>
            <button onClick={this.changeHandler} > Change Heading </button>
            A class component is child of App functional component! {this.props.name}
            <ul>{this.state.list.map((name) => {
                return <li>{name}</li>
            })} </ul>

            <div>
                {this.state.counter}
                <button onClick={this.incrementHandler} > + </button>
                <button onClick={this.decrementHandler} > - </button>

            </div>
        </div>
    }


}

export default App2

