import PlanetsProvider from './context/PlanetsProvider';
import Table from './components/Table';
import TextFilterInput from './components/TextFilterInput';
import NumericFilter from './components/NumericFilter';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <TextFilterInput />
      <NumericFilter />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
