import { useContext } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from '../context/PlanetsContext';

function Table({ sortedPlanets }) {
  const context = useContext(PlanetsContext);
  const { planets } = context;

  return (
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
          sortedPlanets().map((planet) => (
            <tr key={ planet.name }>
              <td data-testid="planet-name">{planet.name}</td>
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
  );
}

Table.propTypes = {
  sortedPlanets: PropTypes.func.isRequired,
};

export default Table;
