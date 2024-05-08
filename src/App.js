import logo from './logo.svg';
import './App.css';
import CourseCreationForm from './Components/Content_Page';
import Navbars from './Components/Course_Description';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


function App() {
  return (
    <div className="App">
   
    <Router>
      <Routes>
      <Route path="/" element={ <Navbars/>} />
        <Route path="/content-creation" element={<CourseCreationForm />} />
        {/* other routes */}
      </Routes>
    </Router>
    {/* <CourseCreationForm/> */}
  </div>
  );
}

export default App;
