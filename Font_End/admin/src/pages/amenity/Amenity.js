import "./amenity.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import AmenittyTable from "../../components/StayAmenity/AmenittyTable";

const Amenity = () => {
  return (
    <div className="amenity">
    <Sidebar/>
    <div className="amenityContainer">
    <Navbar />
    <AmenittyTable/>
  </div>
  </div>
    
  )
}

export default Amenity;