import './App.css';
import { ItemProvider } from './context/ItemContext';
import Crud from './Crud';

function App() {
  return (
    <ItemProvider>
      <div className="App">
        <Crud />
      </div>
    </ItemProvider>
  );
}

export default App;
