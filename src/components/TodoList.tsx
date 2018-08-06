import * as React from 'react';
import { Todo } from '../types';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
}

interface State {}

export class TodoList extends React.Component<Props, State> {
  public render() {
    const { todos } = this.props;

    return (
      <React.Fragment>
        <div>{todos.map(this.renderTodo)}</div>
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
}
