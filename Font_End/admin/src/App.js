import React from "react";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Home from "./pages/home/Home";
import Viewdetail from "./pages/stayviewdetail/Viewdetail";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Stay from "./pages/stay/Stay";
import Amenity from "./pages/amenity/Amenity";
import Rules from "./pages/rules/Rules";
import Comment from "./pages/comment/comment";
import Help from "./pages/help/Help"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />}  />
        <Route path="/comment" element={<Comment />}  />
        <Route path="/help" element={<Help />}  />
        <Route path="users">
          <Route index element={<List />} /> 
        </Route>
        <Route path="/stay" element={<Stay />}/>
         <Route path="stay/amenity" element={<Amenity />} />
         <Route path="stay/rules" element={<Rules />} />
         <Route path="/viewdetail/:id" element={<Viewdetail />} />
        
      </Routes>
    
    </BrowserRouter>
  );
}


export default App;