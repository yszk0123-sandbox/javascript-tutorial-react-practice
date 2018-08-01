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

  private input: HTMLInputElement | null = null;

  // 3. DOM へのマウントが完了する (input 要素への参照が既に存在する)
  public componentDidMount() {
    this.focus();
  }

  public focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  // 1. render が呼ばれる
  public render() {
    const { todos } = this.props;
    const { title } = this.state;

    return (
      <React.Fragment>
        <div>{todos.map(this.renderTodo)}</div>
        <div>
          <input
            type="text"
            value={title}
            onChange={this.handleChangeTitle}
            // 2. input 要素が作成される
            // onMount のようなイベントハンドラと考えるとわかりやすい
            // input 要素が作成された時点でこのDOM要素を引数にハンドラが呼ばれる
            ref={input => (this.input = input)}
          />
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
