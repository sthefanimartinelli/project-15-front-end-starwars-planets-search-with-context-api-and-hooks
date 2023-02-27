import React, { useMemo, useState, useEffect } from 'react';
import PlanetsContext from './context/PlanetsContext';
import Table from './components/Table';
import TextFilterInput from './components/TextFilterInput';
import './App.css';

function App() {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  // const [filteredByName, setFilteredByName] = useState([]);

  const planetsFiltered = planets.filter((planet) => {
    const nameFiltered = planet.name.includes(nameFilter);
    return nameFiltered;
  });

  const context = useMemo(() => ({
    planets,
    nameFilter,
    setPlanets,
    setNameFilter,
    planetsFiltered,
  }), [planets, nameFilter, setPlanets, setNameFilter, planetsFiltered]);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((result) => result.json())
      .then((data) => setPlanets(data.results))
      .catch((error) => console.log(error));
  }, []);

  return (
    <PlanetsContext.Provider value={ context }>
      <TextFilterInput />
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
