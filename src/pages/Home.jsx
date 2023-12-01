import { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Table from '../components/Table';

const NUMBER_FOR_SORT = -1;
const SELECT_OPTIONS = ['population', 'orbital_period', 'diameter', 'rotation_period',
  'surface_water'];

function Home() {
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [columnSelect, setColumnSelect] = useState(SELECT_OPTIONS);
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });
  const [orderApplied, setOrderApplied] = useState({});
  const [comparisonInfo, setComparisonInfo] = useState([]);

  const context = useContext(PlanetsContext);
  const { planets } = context;

  const updateFilters = () => {
    const planetsFiltered = planets.filter((planet) => planet.name.includes(nameFilter));

    const filtersResult = planetsFiltered.filter((planet) => {
      const comparisonFiltersCombined = comparisonInfo
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

      return comparisonFiltersCombined;
    });

    return filtersResult;
  };

  const sortPlanets = () => {
    const { column, sort } = orderApplied;
    if (Object.keys(orderApplied).length === 0) return updateFilters();

    return updateFilters().sort((a, b) => {
      if (a[column] === 'unknown') return 1;
      if (b[column] === 'unknown') return NUMBER_FOR_SORT;
      return sort === 'ASC' ? a[column] - b[column] : b[column] - a[column];
    });
  };

  return (
    <main>
      <input
        type="text"
        data-testid="name-filter"
        value={ nameFilter }
        placeholder="Filtrar por nome"
        onChange={ (event) => setNameFilter(event.target.value) }
      />

      <label>
        Coluna
        <select
          data-testid="column-filter"
          value={ columnFilter }
          onChange={ (e) => setColumnFilter(e.target.value) }
        >
          {
            SELECT_OPTIONS.filter((item) => !comparisonInfo
              .find((filterObj) => item === filterObj.column))
              .map((column) => (
                <option value={ column } key={ column }>{column}</option>
              ))
          }
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
        onClick={ () => {
          setComparisonInfo(
            [...comparisonInfo,
              {
                column: columnFilter,
                comparison: comparisonFilter,
                value: valueFilter,
              },
            ],
          );
          setColumnSelect(columnSelect.filter((column) => column !== columnFilter));
          setColumnFilter(columnSelect[0]);
        } }
      >
        FILTRAR
      </button>

      <section>
        <select
          data-testid="column-sort"
          value={ order.column }
          onChange={ ({ target }) => setOrder({ ...order, column: target.value }) }
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
            onChange={ ({ target }) => setOrder({ ...order, sort: target.value }) }
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
            onChange={ ({ target }) => setOrder({ ...order, sort: target.value }) }
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

      <span>
        <button
          data-testid="button-remove-filters"
          onClick={ () => {
            setComparisonInfo([]);
            setColumnFilter('population');
            setComparisonFilter('maior que');
            setValueFilter(0);
          } }
        >
          Remover todas filtragens
        </button>
      </span>

      {comparisonInfo.map((filter, index) => (
        <div key={ index } data-testid="filter">
          <button
            onClick={ () => {
              const arrayClone = [...comparisonInfo];
              arrayClone.splice(index, 1);
              setComparisonInfo(arrayClone);
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

      <Table sortedPlanets={ sortPlanets } />

    </main>
  );
}

export default Home;
