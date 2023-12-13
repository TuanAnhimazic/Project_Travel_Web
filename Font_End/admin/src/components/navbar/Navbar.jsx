import "./navbar.scss";
//import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">

        </div>
        <div className="items">
          <div className="item">
            <LoginOutlinedIcon/>
          <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="item">
            <img
              src="https://cdn.pixabay.com/photo/2013/07/13/01/15/preferences-155386_1280.png"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;