export interface TodoItem {
    context: string;
    editStatus?: boolean;
    isDone?: boolean;
}

export interface TodoList {
    todos: Record<string, TodoItem>;
}

export interface BaseViewStatus {
    isLoading: boolean;
    error: string | null;
}

export interface TodoListApi {
    updateTodoById: (id: string, context: string) => void;
}
