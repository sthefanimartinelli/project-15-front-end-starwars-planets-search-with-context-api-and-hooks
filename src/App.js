import React, { useMemo, useState, useEffect } from 'react';
import PlanetsContext from './context/PlanetsContext';
import Table from './components/Table';
// import Data from './components/Data';
import './App.css';

function App() {
  const [planets, setPlanets] = useState([]);

  const context = useMemo(() => ({
    planets,
    setPlanets,
  }), [planets, setPlanets]);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((result) => result.json())
      .then((data) => setPlanets(data.results))
      .catch((error) => console.log(error));
  }, []);

  return (
    <PlanetsContext.Provider value={ context }>
      <Table />
    </PlanetsContext.Provider>
  );
}

export default App;
