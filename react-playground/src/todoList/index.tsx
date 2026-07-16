import { createStore } from '../store';
import type { TodoList, BaseViewStatus, TodoListApi } from './types';
import TodoListComponent from './components/TodoList';
import Button from './components/Button';

// 定义默认数据
const defaultData: TodoList = {
    todos: {},
};

// 定义默认视图状态
const defaultViewStatus: BaseViewStatus = {
    isLoading: false,
    error: null,
};

// 定义默认API
const defaultApi: TodoListApi = {
    updateTodoById: (id: string, context: string) => {
        useStore().setState({
            data: {
                todos: {
                    ...useStore().getState().data.todos,
                    [id]: {
                        ...useStore().getState().data.todos[id],
                        context,
                    }
                }
            }
        })
    },
};

// 创建并导出store hooks
const { useStore, initStore } = createStore<TodoList, BaseViewStatus, TodoListApi>({
    data: defaultData,
    viewStatus: defaultViewStatus,
    api: defaultApi,
});

// 导出默认组件
const TodoList = () => {
    return (
        <div>
            <TodoListComponent />
            <Button />
        </div>
    );
};

export { useStore, initStore, TodoList, TodoListComponent };