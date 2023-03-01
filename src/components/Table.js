import { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [columnSelect, setColumnSelect] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  // Estado que vai armazenar uma array com objetos, sendo que cada objeto representa um filtro com 3 chaves
  const [numericArray, setNumericArray] = useState([]);

  const context = useContext(PlanetsContext);
  const { planets } = context;

  // Função que atualiza a table ao inserir nome no input ou ao atualizar o array numericArray
  const updateFilters = () => {
    // Função que irá realizar o filtro de nome. Não precisa estar fora da função de update pois atualiza
    // ao atualizar o estado numericArray
    const planetsFiltered = planets.filter((planet) => planet.name.includes(nameFilter));
    const filtersResult = planetsFiltered.filter((planet) => {
      // Para cada planeta, realizará uma verificação se ele passa em TODOS os filtros.
      // Somente se ele passar em todos, retornando TRUE, ele retorna o valor no filter.
      const numericFiltersCombined = numericArray
        .every(({ column, comparison, value }) => {
          switch (comparison) {
          case 'maior que':
            return Number(planet[column]) > (Number(value));
          case 'menor que':
            return Number(planet[column]) < (Number(value));
          case 'igual a':
            return Number(planet[column]) === (Number(value));
          default:
            return true;
          }
        });
      return numericFiltersCombined;
    });
    return filtersResult;
  };

  return (
    <>
      <input
        type="text"
        data-testid="name-filter"
        value={ nameFilter }
        placeholder="Filtrar por nome"
        onChange={ (event) => setNameFilter(event.target.value) }
      />
      <>
        <label>
          Coluna
          <select
            data-testid="column-filter"
            value={ columnFilter }
            onChange={ (e) => setColumnFilter(e.target.value) }
          >
            {['population', 'orbital_period', 'diameter', // Código da monitoria do Tiago
              'rotation_period', 'surface_water']
              .filter((item) => !numericArray
                .find((filterObj) => item === filterObj.column))
              .map((column) => (
                <option value={ column } key={ column }>
                  {column}
                </option>
              ))}
          </select>
        </label>
        <label>
          Operador
          <select
            data-testid="comparison-filter"
            value={ comparisonFilter }
            onChange={ (e) => setComparisonFilter(e.target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          type="number"
          data-testid="value-filter"
          value={ valueFilter }
          onChange={ (e) => setValueFilter(e.target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          // Ao clicar no botão de FILTRAR o array é atualizado com o novo filtro adicionado
          onClick={ () => {
            setNumericArray([...numericArray, { column: columnFilter,
              comparison: comparisonFilter,
              value: valueFilter }]);
            setColumnSelect(columnSelect.filter((column) => column !== columnFilter));
            setColumnFilter(columnSelect[0]);
          } }
        >
          FILTRAR

        </button>
      </>

      <table>
        <thead>
          <tr>
            { planets[0]
          && Object.keys(planets[0]).map((title, index) => (
            <th key={ `${title}-${index}` }>{title}</th>
          ))}
          </tr>
        </thead>
        <tbody>
          {
            updateFilters().map((planet) => (
              <tr key={ planet.name }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
}

export default Table;
