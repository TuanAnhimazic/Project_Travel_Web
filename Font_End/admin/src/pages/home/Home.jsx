import "../home/home.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Widget from "../../components/widget/Widget"
import StayCard from "../../components/staycard/StayCard"

const Home = () => {
  return (
    <div className="home">
      <Sidebar/>
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="stay" />
         
        </div>
       
        <StayCard/>
        
    </div>
    </div>
  )
}

export default Home