import PropTypes from 'prop-types';
import { useMemo, useState, useEffect } from 'react';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const context = useMemo(() => ({
    planets,
    setPlanets,
  }), [planets, setPlanets]);

  useEffect(() => {
    const fecthInfo = async () => {
      const fetchAPI = await fetch('https://swapi.dev/api/planets');
      const response = await fetchAPI.json();
      const responseWithoutResidents = response.results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setPlanets(responseWithoutResidents);
    };
    fecthInfo().catch(console.warn);
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
