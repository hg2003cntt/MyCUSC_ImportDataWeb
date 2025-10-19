import { DiVim } from 'react-icons/di';
import './App.css';
import SideBar from './components/SideBar';
import { Route, Routes, Link } from 'react-router-dom';
import CirriculumPage from './pages/CirriculumPage';
import BatchPage from './pages/BatchPage';
import StudentPage from './pages/StudentPage';
import ScorePage from './pages/ScorePage';
import 'antd/dist/reset.css';

function App() {
  return (
    <div className="App flex">
    <SideBar />
    <Routes>
      <Route path='/' element={<div className='p-10 text-2xl'>Welcome to MyCUSC Dashboard </div>}/>
      <Route path='/cirriculum' element={<CirriculumPage/>}/>
      <Route path='/batch' element={<BatchPage/>}/>
      <Route path='/student' element={<StudentPage/>}/>
      <Route path='/score' element={<ScorePage/>}/>
    </Routes>
    </div>
  );
}

export default App;
