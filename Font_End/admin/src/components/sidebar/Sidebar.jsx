import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link } from "react-router-dom";
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';

import HelpCenterIcon from '@mui/icons-material/HelpCenter';

const Sidebar = () => {
  
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <AdminPanelSettingsIcon className="icon" />
          <span className="logo">𝕬𝖉𝖒𝖎𝖓</span>
        </Link>
      </div>
      <hr />

      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <Link to="/home" className="sidebar-menu-link">
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </Link>
          </li>

          <p className="title">LISTS</p>
          <li>
            <Link to="/users" className="sidebar-menu-link">
              <PersonOutlineIcon className="icon" />
              <span>User Management</span>
            </Link>
          </li>
         
          <li>         
              <Link to="/stay" style={{ textDecoration: "none"}}>
              <StoreIcon className="icon"/> 
              <span>Stay Management</span>  </Link>
              <div class="dropdown">
              <ArrowDropDownTwoToneIcon/>
              <div class="dropdown-content">
              <Link to="/stay/amenity" style={{ textDecoration: "none"}}>
                <a class="dropdown-item" >Amenity</a>
              </Link>
              <Link to="/stay/rules" style={{ textDecoration: "none"}}>
                <a class="dropdown-item" >Rules</a>
              </Link>
                <Link to="/stay/category" style={{ textDecoration: "none"}}>
                <a class="dropdown-item"></a>
                </Link>
              </div>
            </div>
          </li>
         
          <li>
            <Link to="/comment" className="sidebar-menu-link">
              <MarkUnreadChatAltIcon className="icon" />
              <span>Comment Management</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="Bot">
        <ul>
          <p className="title">NOTE</p>
          <li>
            <Link to="/help" className="sidebar-menu-link">
              <HelpCenterIcon className="icon" />
              <span>Support and Help</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
