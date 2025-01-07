import './App.css';
import {Routes,Route} from 'react-router-dom';
import {Navbar} from './components/Navbar';
import {StudentForm} from './pages/StudentForm';
import {StudentsData} from './pages/StudentsData';
import {PassedStudent} from './pages/PassedStudent';
import {FailedStudent} from './pages/FailedStudent';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<StudentForm/>}/>
        <Route path='/studentsdata' element={<StudentsData/>}/>
        <Route path='/passedstudent' element={<PassedStudent/>}/>
        <Route path='/failedstudent' element={<FailedStudent/>}/>
      </Routes>
    </div>
  );
}

export default App;
