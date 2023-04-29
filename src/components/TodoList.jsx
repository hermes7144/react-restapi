import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

export default function TodoList({ filter }) {
  const queryClient = useQueryClient();

  const axi = axios.create({ baseURL: 'http://localhost:4000/todos' });

  const { isLoading, error, data: todos } = useQuery(['todos'], async () => axi.get().then((res) => res.data), { staleTime: 1000 * 60 });

  const handleAdd = useMutation(
    (todo) => {
      return axi.post('', { todo, completed: false });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos']);
      },
    }
  );

  const handleUpdate = useMutation(
    (todo) => {
      return axi.put(`${todo.id}`, { ...todo, completed: !todo.completed });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos']);
      },
    }
  );

  const handleDelete = useMutation(
    (id) => {
      return axi.delete(`${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos']);
      },
    }
  );

  const filtered = filteredValue(filter, todos);

  console.log(filtered);

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
