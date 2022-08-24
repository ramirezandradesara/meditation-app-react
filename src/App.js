import Meditation from './Meditation';
import './App.css';
import { Provider } from './reducer/Reducer';

function App() {
  return (
    <Provider>
      <div className="App">
        <Meditation />
      </div>
    </Provider>
  );
}

export default App;
