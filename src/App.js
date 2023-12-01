import PlanetsProvider from './context/PlanetsProvider';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <Home />
    </PlanetsProvider>
  );
}

export default App;
