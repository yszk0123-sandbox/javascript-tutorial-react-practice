import * as React from 'react';
import { fetchTodos } from '../apis';
import { TodoList } from '../components/TodoList';
import { Todo } from '../types';

interface Props {}

interface State {
  todos: Todo[];
}

export class TodosContainer extends React.Component<Props, State> {
  public state: State = {
    todos: []
  };

  public componentDidMount() {
    fetchTodos()
      .then(({ data }) => {
        this.setState({ todos: data });
      })
      .catch(error => {
        alert(error);
      });
  }

  public render() {
    const { todos } = this.state;

    return <TodoList todos={todos} />;
  }
}
