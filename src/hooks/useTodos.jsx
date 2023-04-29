import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function useTodos() {
  const queryClient = useQueryClient();

  const axi = axios.create({ baseURL: 'http://localhost:4000/todos' });

  const todosQuery = useQuery(['todos'], async () => axi.get().then((res) => res.data), { staleTime: 1000 * 60 });

  const handleAdd = useMutation((todo) => axi.post('', { todo, completed: false }), {
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });

  const handleUpdate = useMutation((todo) => axi.put(`${todo.id}`, { ...todo, completed: !todo.completed }), {
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });

  const handleDelete = useMutation((id) => axi.delete(`${id}`), {
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });

  return { todosQuery, handleAdd, handleUpdate, handleDelete };
}
