import './App.css';
import SideBar from './components/SideBar';
import { Route, Routes, Link } from 'react-router-dom';
import CirriculumPage from './pages/CirriculumPage';
import StudentPage from './pages/StudentPage';
import ScorePage from './pages/ScorePage';
import ActivityPage from './pages/ActivityPage';

function App() {
  return (
    <div className="App flex">
    <SideBar />
    <Routes>
      <Route path='/' element={<div className='p-10 text-2xl'>Welcome to MyCUSC Dashboard </div>}/>
      <Route path='/cirriculum' element={<CirriculumPage/>}/>
      <Route path='/activity' element={<ActivityPage/>}/>
      <Route path='/student' element={<StudentPage/>}/>
      <Route path='/score' element={<ScorePage/>}/>
    </Routes>
    </div>
  );
}

export default App;
