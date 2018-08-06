import * as React from 'react';
import { Todo } from '../types';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  onAddTodo: Function;
}

interface State {
  title: string;
}

export class TodoList extends React.Component<Props, State> {
  public state: State = {
    title: ''
  };

  public render() {
    const { todos } = this.props;
    const { title } = this.state;

    return (
      <React.Fragment>
        <div>{todos.map(this.renderTodo)}</div>
        <div>
          <input type="text" value={title} onChange={this.handleChangeTitle} />
          <button onClick={this.handleAddTodo}>Add</button>
        </div>
      </React.Fragment>
    );
  }

  /**
   * key を設定しない場合、React が差分を計算する際に、要素の入れ替わりを検知できないので、
   * React の管理下にない状態 (例: DOM に保持されている状態) を正しく更新できない場合がある。
   * @example
   * <form>
   *   {users.map(user => (
   *     <input key={user.id} defaultValue="" />
   *   ))}
   * </form>
   */
  private renderTodo(todo: Todo) {
    return <TodoItem key={todo.id} {...todo} />;
  }

  private handleChangeTitle = (
    event: React.SyntheticEvent<HTMLInputElement>
  ) => {
    this.changeTitle(event.currentTarget.value);
  };

  private handleAddTodo = (event: React.SyntheticEvent<HTMLElement>) => {
    const { onAddTodo } = this.props;
    const { title } = this.state;

    onAddTodo(title);
    this.reset();
  };

  private changeTitle(title: string) {
    this.setState({ title });
  }

  private reset() {
    this.setState({ title: '' });
  }
}
