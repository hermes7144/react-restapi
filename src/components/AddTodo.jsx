import { useState } from 'react';

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length === 0) {
      return;
    }
    onAdd.mutate(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className='w-full flex p-4'>
      <input type='text' className='flex-1' onChange={handleChange} value={text} />
      <button className='bg-slate-500 text-white font-bold p-1'>Add</button>
    </form>
  );
}
