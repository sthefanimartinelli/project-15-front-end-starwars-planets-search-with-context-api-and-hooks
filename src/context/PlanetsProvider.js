import PropTypes from 'prop-types';
import { useMemo, useState, useEffect, useCallback } from 'react';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [numericFilter, setNumericFilter] = useState([]);

  const planetsFiltered = planets.filter((planet) => planet.name.includes(nameFilter));

  const nameAndNumericFiltered = useCallback(() => {
    const numeric = planetsFiltered.filter((planet) => {
      const { columnFilter, comparisonFilter, valueFilter } = numericFilter;
      switch (comparisonFilter) {
      case 'maior que':
        return Number(planet[columnFilter]) > (Number(valueFilter));
      case 'menor que':
        return Number(planet[columnFilter]) < (Number(valueFilter));
      case 'igual a':
        return Number(planet[columnFilter]) === (Number(valueFilter));
      default:
        return true;
      }
    });
    return numeric;
  }, [numericFilter, planetsFiltered]);

  const context = useMemo(() => ({
    planets,
    nameFilter,
    numericFilter,
    setPlanets,
    setNameFilter,
    setNumericFilter,
    planetsFiltered,
    nameAndNumericFiltered,
  }), [planets, nameFilter, numericFilter, setPlanets,
    setNameFilter, setNumericFilter, planetsFiltered, nameAndNumericFiltered]);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((result) => result.json())
      .then((data) => setPlanets(data.results.map((planet) => {
        delete planet.residents;
        return planet;
      })))
      .catch((error) => console.log(error));
  }, []);

  return (
    <PlanetsContext.Provider value={ context }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
