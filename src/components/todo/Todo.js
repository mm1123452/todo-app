import React, {Component} from 'react'
import './Todo.css'

class Todo extends Component {
	constructor(props) {
		super(props)

		this.state = {
			editing: false,
			id:"",
			todo: this.props.todo

		}
		this.handleRemove = this.handleRemove.bind(this)
		this.handleEdit = this.handleEdit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSave= this.handleSave.bind(this)
		this.keyPressed= this.keyPressed.bind(this)
		this.handleBlur= this.handleBlur.bind(this)
		this.handleComplete = this.handleComplete.bind(this)
	}

	handleRemove(evt) {
		this.props.removeTodo(evt.target.id)
	}

	handleEdit(evt) {
		const id = evt.target.id
		this.setState((prev) => {
			return {
				editing: !prev.editing,
				id:id			
			}
		})
	}

	handleChange(evt) {
		this.setState({todo: evt.target.value})
	}

	handleSave(evt) {
		this.props.editTodo({todo:this.state.todo ,index:this.props.index})
		this.setState({editing: false,
			id:""})
	}

	keyPressed(evt) {
	  if (evt.key === "Enter") {
	    this.handleSave(evt)
	  }
	}

	handleBlur(evt) {
		 this.handleSave(evt)
	}

	handleComplete(evt) {
		 this.props.handleComplete(this.props.index)
	}

	render() {
		return (
			<div className="divider">
			{this.state.editing && this.state.id === this.props.id ?
				<form className="todoForm-items">
					<input 
					className="todo-edit-input"
					value={this.state.todo}
					onChange={this.handleChange}
					onKeyPress={this.keyPressed}
					onBlur={this.handleBlur}/>
					<button className="todo-edit-button"  onClick={this.handleSave}>Save</button>
				</form>
				 :
				<div className="todo-item">
					<p onClick={this.handleComplete} className={this.props.completed ?"todo-item-text todo-item-completed":"todo-item-text"}>{this.props.todo}</p>
					<div className="todo-item-buttons">
						<i className="fas fa-pen todo-item-edit" id={this.props.id} onClick={this.handleEdit}></i>
						<i className="fas fa-trash todo-item-delete" id={this.props.id} onClick={this.handleRemove}></i>
					</div>
				</div>				
			}
			</div>
		)
	}
}

export default Todo;