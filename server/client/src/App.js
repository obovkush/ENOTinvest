import './App.css';

import AppBar from './components/AppBar/AppBar';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <div className="App container">
      <AppBar />
      <section className="list App-content">
        <AppRouter />
      </section>
    </div>
  );
}

export default App;
