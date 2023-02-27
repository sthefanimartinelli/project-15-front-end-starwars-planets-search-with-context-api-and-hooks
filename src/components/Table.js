import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const context = useContext(PlanetsContext);
  const { planetsFiltered } = context;
  const planetsWithoutResidents = planetsFiltered.map((planet) => {
    delete planet.residents;
    return planet;
  });

  return (
    <table>
      <thead>
        <tr>
          { planetsWithoutResidents[0]
          && Object.keys(planetsWithoutResidents[0]).map((title) => (
            <th key={ title }>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {
          planetsWithoutResidents.map((planet) => (
            <tr key={ planet.name }>
              { planetsWithoutResidents[0]
               && Object.keys(planetsWithoutResidents[0]).map((title) => (
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
