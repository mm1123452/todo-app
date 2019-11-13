import React, {Component} from 'react'
import uuid from 'uuid/v4'
import './NewTodoForm.css'

class NewTodoForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			todo: "",
			completed:false
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(evt) {
		this.setState({[evt.target.name]: evt.target.value})
	}

	handleSubmit(evt) {
		evt.preventDefault()

		if (this.state.todo.trim() !== "") {
			this.props.addTodo({...this.state, id: uuid()})
			this.setState({todo:""})
		} 
		
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} className="todoForm">
				<label className="todoForm-label"htmlFor="todo">New Todo
				</label>
				<div className="todoForm-items">
					<input
					id="todo"
					className="todoForm-input"
					name="todo"
					value={this.state.todo}
					onChange={this.handleChange}
					placeholder="Ex. Do Laundry">
					</input>
					<button className="todoForm-button">Add </button>
				</div>
			</form>
		)
	}
}

export default NewTodoForm;