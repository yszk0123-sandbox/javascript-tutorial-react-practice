import * as apis from '../apis';
import { Action, ActionTypes } from '../types/ActionTypes';
import { Todo } from '../types/CommonTypes';

const addTodoRequest = (title: string): Action => ({
  type: ActionTypes.ADD_TODO_REQUEST,
  payload: { title }
});

const addTodoSuccess = (todo: Todo): Action => ({
  type: ActionTypes.ADD_TODO_SUCCESS,
  payload: { todo }
});

const addTodoFailure = (): Action => ({
  type: ActionTypes.ADD_TODO_FAILURE
});

export const addTodo = (title: string) => {
  return async dispatch => {
    dispatch(addTodoRequest(title));

    try {
      const todos = await apis.addTodo(title);
      dispatch(addTodoSuccess(todos));
    } catch (error) {
      dispatch(addTodoFailure());
      alert(error);
    }
  };
};
