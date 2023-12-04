import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerList from './CustomLST.jsx';
import TrainingList from './TrainLST.jsx';
import TrainingCalendar from './Calendar.jsx';
import StatisticsPage from './Stats.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/FrontDeployment" element={<CustomerList />} />
        <Route path="/FrontDeployment/trainings" element={<TrainingList />} />
        <Route path="/FrontDeployment/calendar" element={<TrainingCalendar />} />
        <Route path="/FrontDeployment/statistics" element={<StatisticsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
