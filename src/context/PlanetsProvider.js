import PropTypes from 'prop-types';
import { useMemo, useState, useEffect, useCallback } from 'react';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [numericArray, setNumericArray] = useState([]);

  const planetsFiltered = planets.filter((planet) => planet.name.includes(nameFilter));

  const nameAndNumericFiltered = useCallback(() => {
    const filtersResult = planetsFiltered.filter((planet) => {
      const numericFiltersCombined = numericArray
        .every(({ columnFilter, comparisonFilter, valueFilter }) => {
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
      return numericFiltersCombined;
    });
    return filtersResult;
  }, [planetsFiltered, numericArray]);

  const context = useMemo(() => ({
    planets,
    nameFilter,
    numericArray,
    setPlanets,
    setNameFilter,
    planetsFiltered,
    nameAndNumericFiltered,
    setNumericArray,
  }), [planets, nameFilter, numericArray, setPlanets,
    setNameFilter, planetsFiltered, setNumericArray,
    nameAndNumericFiltered]);

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
