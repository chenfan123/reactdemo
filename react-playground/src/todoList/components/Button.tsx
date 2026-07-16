import { useStore } from '../index';

export default () => {
    const store = useStore();
    const updateTodoById = store((state) => state.api.updateTodoById);
    return (
        <button onClick={
            () => {
                debugger 
                updateTodoById('1', 'sleep')
            }
        }>click me</button>
    )
}