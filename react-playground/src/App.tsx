import React from "react";
import { useStore, initStore, TodoListComponent } from './todoList/index.tsx'

const App: React.FC = () => {
  
  initStore({
    data: {
      todos: {
        '1': {
          context: 'eat',
        }
      }
    },
    viewStatus: {
      isLoading: true,
      error: null,
    }
  }, (buildinApi) => {
    return {
      ...buildinApi,
      updateTodoById: (...args) => {
        buildinApi.updateTodoById(...args);
      },
    }
  });
  const store = useStore();
  const updateTodoById = store(state => {
    return state.api.updateTodoById
  });

  return (
  <div>
    <TodoListComponent></TodoListComponent>
    <button onClick={() => {
      updateTodoById('1', 'sleep')
    }}>update</button>
  </div>)
}
export default App;
