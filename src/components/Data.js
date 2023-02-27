// import { useEffect, useContext } from 'react';
// import PlanetsContext from '../context/PlanetsContext';

// function Data() {
//   const context = useContext(PlanetsContext);
//   const { setPlanets } = context;
//   useEffect(() => {
//     fetch('https://swapi.dev/api/planets')
//       .then((result) => result.json())
//       .then((data) => setPlanets(data.results))
//       .catch((error) => console.log(error));
//   }, [setPlanets]);
// }

// export default Data;
