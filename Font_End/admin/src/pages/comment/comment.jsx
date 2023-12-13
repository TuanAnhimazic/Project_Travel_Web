
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import CommentList from "../../components/comment/CommentList";

const Rules = () => {
  return (
    <div className="rules">
    <Sidebar/>
    <div className="rulesContainer">
    <Navbar />
     <CommentList/>
  
  </div>
  </div>
    
  )
}

export default Rules;