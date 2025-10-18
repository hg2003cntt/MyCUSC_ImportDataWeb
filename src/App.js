import { DiVim } from 'react-icons/di';
import './App.css';
import SideBar from './pages/SideBar';
import { Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App flex">
    <SideBar />
    <Routes>
      <Route path='/' element={<div className='p-10 text-2xl'>Welcome to MyCUSC Dashboard </div>}/>
      <Route path='/cirriculum' element={<div className='p-10 text-2xl'>Curriculum Page</div>}/>
      <Route path='/batch' element={<div className='p-10 text-2xl'>Batch Page</div>}/>
      <Route path='/student' element={<div className='p-10 text-2xl'>Student Page</div>}/>
      <Route path='/score' element={<div className='p-10 text-2xl'>Score Page</div>}/>
    </Routes>
    </div>
  );
}

export default App;
