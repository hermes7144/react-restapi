export default function Header({ filters, filter, onFilter }) {
  const handleFilter = (index) => {
    onFilter(index);
  };
  console.log(filter);
  return (
    <header>
      <ul className='flex m-1'>
        {filters.map((value, index) => (
          <li key={index}>
            <button onClick={() => handleFilter(index)} className={`${value === filter ? 'text-blue-600' : ''}`}>
              {value}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}
