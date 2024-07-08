import './App.css';
import LongPollingComponent from './components/longPolling';
import ShortPollingComponent from './components/shortPolling'

function App() {
  return (
    <div className="App">
      <div>
        <h1>Short Polling</h1>
        <ShortPollingComponent />
      </div>
      <hr/>
      <div>
        <h1>Long Polling</h1>
        <LongPollingComponent />
      </div>
    </div>
  );
}

export default App;
