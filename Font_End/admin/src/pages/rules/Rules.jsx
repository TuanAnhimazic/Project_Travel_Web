import "./Rules.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import RulesTable from "../../components/StayRules/rulesTable";

const Rules = () => {
  return (
    <div className="rules">
    <Sidebar/>
    <div className="rulesContainer">
    <Navbar />
     <RulesTable/>
  
  </div>
  </div>
    
  )
}

export default Rules;