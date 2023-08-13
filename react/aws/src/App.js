import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Buckets from './Components/buckets/buckets';
import Objects from './Components/objects/objects'
function App() {
  return (
    <div className="container mt-3">
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Buckets/>}/>
            <Route path='/buckets' element={<Buckets/>} >
              <Route path='/buckets/objects/:bucket' element={<Objects key={Date.now()}/>} />
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
