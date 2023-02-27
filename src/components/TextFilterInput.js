import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function TextFilter() {
  const context = useContext(PlanetsContext);
  const { nameFilter, setNameFilter } = context;
  return (
    <input
      type="text"
      data-testid="name-filter"
      value={ nameFilter }
      placeholder="Filtrar por nome"
      onChange={ (event) => setNameFilter(event.target.value) }
    />
  );
}

export default TextFilter;
