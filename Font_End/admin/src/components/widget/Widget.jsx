import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// Import an icon for "stay" here
// For example, using BedOutlinedIcon if it's for hotel stays or similar
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Widget = ({ type }) => { // Removed title, isMoney, link since they're not used
  const [userCount, setUserCount] = useState(0);
  const [stayCount, setStayCount] = useState(0);

  useEffect(() => {
    if (type === "user") {
      getUserData();
    } else if (type === "stay") {
      getStayData();
    }
    // Depend on 'type' to re-run this effect when it changes
  }, [type]);

  const getUserData = () => {
    axios.get('https://localhost:7249/api/Account/count')
      .then(response => {
        setUserCount(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  const getStayData = () => {
    axios.get('https://localhost:7249/api/MStay/count')
      .then(response => {
        setStayCount(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  const diff = 100; // This should probably be dynamic based on data
  let data;

  if (type === "user") {
    data = {
      title: "USERS",
      count: userCount,
      link: "Count all users",
      linkHref: "/users",
      icon: (
        <PersonOutlinedIcon className="icon" />
      ),
    };
  } else if (type === "stay") {
    data = {
      title: "STAYS",
      count: stayCount,
      link: "Count all stays",
      icon: (
        <BedOutlinedIcon className="icon" />
      ),
    };
  } else {
    return <div>Invalid widget type</div>;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.count}</span>
        <span className="link">{data.link}</span>
        
      </div>
      <div className="right">
        <div className={`percentage ${diff > 0 ? 'positive' : 'negative'}`}>
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
