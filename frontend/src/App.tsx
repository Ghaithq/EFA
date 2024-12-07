import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./views/HomePage.tsx";
// import StadiumsView from './views/StadiumsView.tsx'
import StadiumsView from "./views/StadiumsView.tsx";
import Authorize from "./views/Authorization.tsx"; import MatchesView from './views/MatchesView.tsx';
import UserTickets from "./views/UserTickets.tsx";
import { Box } from "@mui/material";

const App = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stadiums" element={<StadiumsView />} />
          <Route path="/matches" element={<MatchesView />} />
          <Route path="/authorize" element={<Authorize />} />
          <Route path="/tickets" element={<UserTickets />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
