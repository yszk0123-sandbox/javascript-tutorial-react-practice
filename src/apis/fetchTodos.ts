import axios from 'axios';
import { Todo } from '../types';

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>('http://localhost:4000/todos');

  return response.data;
};
