import { useStore } from '../index.tsx';

export default () => {
    const store = useStore();
    const todos = store((state) => {
        return state.data.todos
    });
    debugger 
    return (
        <div>
            <ul>
                <li>{todos['1'].context}</li>
            </ul>
        </div>
    )
}