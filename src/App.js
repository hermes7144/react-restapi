import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import TodoList from './components/TodoList';
import { useState } from 'react';
import Header from './components/Header';

const queryClient = new QueryClient()
function App() {
  const filters = ['All', 'Active', 'Completed'];
  const [filter, setFilter] = useState(filters[0]);

  const handleFilter = (index) => {
    setFilter(filters[index])
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Header filters={filters} filter={filter} onFilter={handleFilter} />
      <TodoList filter={filter} />
    </QueryClientProvider>
  );
}

export default App;
