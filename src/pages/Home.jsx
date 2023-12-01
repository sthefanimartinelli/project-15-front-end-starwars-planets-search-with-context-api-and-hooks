import { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Table from '../components/Table';

function Home() {
  const NUMBER_FOR_SORT = -1;
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
  const [order, setorder] = useState({ column: 'population', sort: 'ASC' });
  const [orderApplied, setOrderApplied] = useState({});
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

  // Função que ordena os dados
  const sortPlanets = () => {
    const { column, sort } = orderApplied;
    if (Object.keys(orderApplied).length === 0) return updateFilters();

    return updateFilters().sort((a, b) => {
      if (a[column] === 'unknown') {
        return 1;
      }
      if (b[column] === 'unknown') {
        return NUMBER_FOR_SORT;
      } if (sort === 'ASC') {
        return a[column] - b[column];
      }
      return b[column] - a[column];
    });
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
            {['population', 'orbital_period', 'diameter',
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
      {/* Seção para ordenar a tabela */}
      <section>
        <select
          data-testid="column-sort"
          value={ order.column }
          onChange={ ({ target }) => setorder({ ...order, column: target.value }) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">population</option>
          <option value="surface_water">surface_water</option>
        </select>
        <label htmlFor="ASC">
          Ascendente
          <input
            id="ASC"
            type="radio"
            name="order"
            data-testid="column-sort-input-asc"
            value="ASC"
            checked={ order.sort === 'ASC' }
            onChange={ ({ target }) => setorder({ ...order, sort: target.value }) }
          />
        </label>
        <label htmlFor="DESC">
          Descendente
          <input
            id="DESC"
            type="radio"
            name="order"
            data-testid="column-sort-input-desc"
            value="DESC"
            checked={ order.sort === 'DESC' }
            onChange={ ({ target }) => setorder({ ...order, sort: target.value }) }
          />
        </label>
        <button
          data-testid="column-sort-button"
          type="button"
          onClick={ () => setOrderApplied({
            column: order.column,
            sort: order.sort,
          }) }
        >
          ORDENAR
        </button>
      </section>
      {/* Botão de remover todos os filtros */}
      <span>
        <button
          data-testid="button-remove-filters"
          onClick={ () => {
            setNumericArray([]);
            setColumnFilter('population');
            setComparisonFilter('maior que');
            setValueFilter(0);
          } }
        >
          Remover todas filtragens
        </button>
      </span>
      {/* Código baseado na mentoria do Tiago */}
      {numericArray.map((filter, index) => (
        <div key={ index } data-testid="filter">
          <button
            onClick={ () => {
              const arrayClone = [...numericArray];
              arrayClone.splice(index, 1);
              setNumericArray(arrayClone);
            } }
          >
            𝙭
          </button>
          <span>
            {filter.column}
            {' '}
            {filter.comparison}
            {' '}
            {filter.value}
          </span>
        </div>
      ))}

      <Table sortFunction={ sortPlanets } />
    </>
  );
}

export default Home;
