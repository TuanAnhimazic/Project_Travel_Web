import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
// import React, {useState, useEffect} from "react" ;
import Table from "../../components/usertable/Table"





const List = () => {
  return (
    <div className="list">
    <Sidebar/>
    <div className="listContainer">
      <Navbar />
     <Table/>
  </div>
  </div>
  )
}

export default List