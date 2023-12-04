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
        <Route path="/" element={<CustomerList />} />
        <Route path="/trainings" element={<TrainingList />} />
        <Route path="/calendar" element={<TrainingCalendar />} />
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
