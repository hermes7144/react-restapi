import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import useTodos from '../hooks/useTodos';

export default function TodoList({ filter }) {
  const {
    todosQuery: { isLoading, error, data: todos },
    handleAdd,
    handleUpdate,
    handleDelete,
  } = useTodos();

  const filtered = filteredValue(filter, todos);

  return (
    <section className='h-full min-h-0 flex flex-col'>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something is Wrong</p>}
      <ul className='flex-auto'>{filtered && filtered.map((todo) => <TodoItem key={todo.id} todo={todo} onUpdate={handleUpdate} onDelete={handleDelete} />)}</ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}

function filteredValue(filter, todos) {
  if (filter === 'All') {
    return todos;
  } else if (filter === 'Active') {
    return todos.filter((todo) => todo.completed === false);
  } else {
    return todos.filter((todo) => todo.completed === true);
  }
}
