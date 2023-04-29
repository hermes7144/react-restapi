export default function TodoItem({ todo, onUpdate, onDelete }) {
  console.log(todo.completed);
  return (
    <li className='flex justify-between margin px-3 py-3 mx-2'>
      <input type='checkbox' checked={todo.completed} onClick={() => onUpdate.mutate(todo)} />
      <p>{todo.todo}</p>
      <button className='bg-slate-200' onClick={() => onDelete.mutate(todo.id)}>
        Delete
      </button>
    </li>
  );
}
