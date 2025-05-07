import { useState } from 'react'

const ToDoApp = () => {
    const [todo, setTodo] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [editingValue, setEditingValue] = useState('')
    const [editingIndex, setEditingIndex] = useState(null);

    const handleInput = (event) => {
        setTodo(event.target.value);
    };

    const handleAddTodo = () => {
        if (todo.trim()) {
            setTodoList([...todoList, todo]);
            setTodo('');
        }
    }
    const handleEdit = (index, editTodo) => {
        setEditingIndex(index);
        setEditingValue(editTodo);
    }
    const handleSave = (index) => {
        const updatedTodos = [...todoList];
        updatedTodos[index] = editingValue;
        setTodoList(updatedTodos);
        setEditingIndex(null)
        setEditingValue('')

    }
    const handleRemove = (index) => {
        const updatedTodos = todoList.filter((todos, indexx) => indexx !== index);
        setTodoList(updatedTodos);
    }
    return (
        <div>
            <h1>Todo's</h1>
            <input
            type="text"
            placeholder='Add A Todo'
            value={todo}
            onChange={handleInput}
            />
            <button onClick={handleAddTodo}>Add</button>
            {todoList.map((todo, index) => (
                <div key={index}>
                    {editingIndex === index ? (
                        <div>
                            <input
                            type='text'
                            placeholder={editingValue}
                            value={editingValue}
                            onChange={(event) => setEditingValue(event.target.value)}
                            />
                            <button onClick={() => handleSave(index)}>Update Todo</button>
                        </div>
                    ) : (
                       <div>
                        <p>{todo}</p>
                        <button onClick={() => handleEdit(index, todo)}>Edit</button>
                        <button onClick={() => handleRemove(index)}>Remove</button>
                       </div> 
                    )}
                    
                </div>
            ))}
        </div>
    )
}
export default ToDoApp;