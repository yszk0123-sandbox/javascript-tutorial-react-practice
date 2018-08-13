import { connect } from 'react-redux';
import * as actions from '../actions';
import { RootState } from '../reducers/rootReducer';
import { Todo } from '../types/CommonTypes';
import { Todos } from './Todos';

export interface Props {
  todos: Todo[];
  loading: boolean;
  addTodo: Function;
  fetchTodos: Function;
}

export interface State {}

const mapStateToProps = (state: RootState) => {
  const { todos, loading } = state.todos;

  return {
    todos,
    loading
  };
};

const mapDispatchToProps = {
  addTodo: actions.addTodo,
  fetchTodos: actions.fetchTodos
};

export const TodosContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);
