import React, {Component} from 'react'
import NewTodoForm from '../newTodoForm/NewTodoForm'
import Todo from '../todo/Todo'
import './TodoList.css'

class TodoList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			todos: []
		}

		this.addTodo = this.addTodo.bind(this)
		this.removeTodo = this.removeTodo.bind(this)
		this.editTodo = this.editTodo.bind(this)
		this.markComplete = this.markComplete.bind(this)
	}

	componentDidUpdate(prevProps, prevState){
		if (prevState !== this.state) {
			localStorage.setItem('todoList', JSON.stringify(this.state.todos))
		}
	}

	componentDidMount() {
		const todos = localStorage.getItem('todoList')

		if (todos !== null) {
			this.setState({todos: JSON.parse(todos)})
		}		
	}

	addTodo(todo) {
		const newTodo = [...this.state.todos, todo]
		this.setState({todos: newTodo})
	}

	removeTodo(id) {
		const newTodo = this.state.todos.filter(todo => todo.id !== id)
		this.setState({todos: newTodo})
	}

	editTodo({todo,index}) {
		const newTodo = [...this.state.todos]
		newTodo[index] = {...newTodo[index], todo}
		this.setState({todos: newTodo})
	}

	markComplete(index) {
		const newTodo = [...this.state.todos]
		newTodo[index] = {...newTodo[index], completed: !this.state.todos[index].completed}
	   	this.setState({todos: newTodo})
	}

	render() {
		const todoList = this.state.todos.map((todo,index) => 
			<Todo key={todo.id} 
				id={todo.id}
				index={index}
				completed={todo.completed}
				todo={todo.todo} 
				removeTodo={this.removeTodo}
				editTodo={this.editTodo}
				handleComplete={this.markComplete}/>
			
		)
		return (
			<div className="todoApp">
				<h1 className="todoApp-title">Todo App!</h1>
				<NewTodoForm addTodo={this.addTodo}/>
				<div className="todoApp-list">{todoList}</div>
				
			</div>
		)
	}
}

export default TodoList;