import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const context = useContext(PlanetsContext);
  const { nameAndNumericFiltered } = context;

  return (
    <table>
      <thead>
        <tr>
          { nameAndNumericFiltered()[0]
          && Object.keys(nameAndNumericFiltered()[0]).map((title) => (
            <th key={ title }>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {
          nameAndNumericFiltered().map((planet) => (
            <tr key={ planet.name }>
              { nameAndNumericFiltered()[0]
               && Object.keys(nameAndNumericFiltered()[0]).map((title) => (
                 <td key={ `${planet}-${title}` }>{planet[title]}</td>
               ))}
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;
