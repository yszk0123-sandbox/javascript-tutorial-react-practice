import * as React from 'react';
import { fetchTodos } from '../apis';
import { ControlPanel } from '../components/ControlPanel';
import { TodoList } from '../components/TodoList';
import { Todo } from '../types';

interface Props {}

interface State {
  todos: Todo[];
}

export class TodosContainer extends React.Component<Props, State> {
  private todoList: TodoList | null = null;

  public state: State = {
    todos: []
  };

  public async componentDidMount() {
    try {
      const { data } = await fetchTodos();

      this.setState({ todos: data });
    } catch (error) {
      alert(error);
    }
  }

  public render() {
    const { todos } = this.state;

    return (
      <React.Fragment>
        <TodoList
          todos={todos}
          onAddTodo={this.handleAddTodo}
          ref={todoList => (this.todoList = todoList)}
        />
        <ControlPanel onClick={this.handleClickFocusButton} />
      </React.Fragment>
    );
  }

  private handleAddTodo = (title: string) => {
    const { todos } = this.state;

    const newTodo: Todo = this.createTodo(title);

    this.setState({
      todos: todos.concat(newTodo)
    });
  };

  private handleClickFocusButton = () => {
    if (this.todoList) {
      this.todoList.focus();
    }
  };

  private createTodo(title: string) {
    return {
      id: Math.floor(Math.random() * 1000000),
      title,
      completed: false,
      userId: Math.floor(Math.random() * 1000000)
    };
  }
}
