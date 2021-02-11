import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import OtherPage from './components/OtherPage'
import Fib from './components/Fib'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Fibonacy calculator</h1>
          <Link to="/">Home</Link>
          <Link to="/other">Other</Link>
        </header>
        <div>
          <Route exact path="/" component={Fib} />
          <Route path="/other" component={OtherPage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
