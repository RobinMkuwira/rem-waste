import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SelectSkipView from './views/SelectSkipView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectSkipView/>}/>
      </Routes>
    </Router>
  );
}

export default App;
