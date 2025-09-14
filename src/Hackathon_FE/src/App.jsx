import { useState } from 'react'
import FinanceDashboard from './pages/dashboard/dashboard';
import { Routes, Route } from 'react-router-dom'; 
import AdviceInsightsPage from './pages/assist/advice';
import GoalTrackerPage from './pages/goals/goals';

function App() {
  
  return (
    <Routes>
       <Route path="/" element={<h1>Welcome Home</h1>} />
      <Route path="/user/dashboard" element={<FinanceDashboard/>}/>
      <Route path="/user/insights" element={<AdviceInsightsPage/>}/>
      <Route path="/user/goals" element={<GoalTrackerPage/>}/>
    </Routes>
  )
}

export default App
