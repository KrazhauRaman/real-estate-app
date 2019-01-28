import { ADD_TODO } from './_action-types';

export const addTodo = content => ({
  type: ADD_TODO,
  payload: {
    id: 1,
    content,
  },
});
