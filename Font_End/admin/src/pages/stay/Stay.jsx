import "./stay.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Staytable from "../../components/staytable/Staytable";
const Stay = () => {
  return (
    <div className="stay">
    <Sidebar/>
    <div className="stayContainer">
    <Navbar />
    <Staytable/>
  </div>
  </div>
    
  )
}

export default Stay;