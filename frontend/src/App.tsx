import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './views/HomePage.tsx';
// import StadiumsView from './views/StadiumsView.tsx'
import StadiumsView from './views/StadiumsView.tsx';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stadiums" element={<StadiumsView />} />
      </Routes>
    </Router>
  );
};

export default App;
