import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { AmenityType } from './AmenityType.ts';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';


const AmenittyTable = () => {
    // State variables
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    type: 'General',
    name: '',
    isChecked: false,
  });

  const [selectedCategory, setSelectedCategory] = useState('All'); 
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const getData = useCallback(() => {
    axios
      .get('https://localhost:7249/api/Amenity/AmenityList')
      .then((result) => {
        if (result.data.success) {
          const amenitiesWithCategory = result.data.data.map((amenity) => ({
            ...amenity,
            category: getCategoryLabel(amenity.type),
          }));
          setData(amenitiesWithCategory);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  //
  useEffect(() => {
    getData();
  },[getData]);
  //
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleDeleteAction = (id) => {
    const shouldDelete = window.confirm('Do you want to delete?');
    if (shouldDelete) {
        axios
        .delete(`https://localhost:7249/api/Amenity/delete/${id}`)
        .then((response) => {
          if (response.data.success) {
            setError(null);
            console.log('Delete:', response.data.message);
            const updatedData = data.filter((item) => item.id !== id);
            setData(updatedData);
            setSuccess(response.data.message);
          } else {
            setError(response.data.message);
            setSuccess(null);
          }
        })
        .catch((error) => {
          console.error('Error deleting Amenity:', error);
          setError(error);
          setSuccess(null);
        });
    
    }
  };

  const handleAddAmenity = () => {
    const newAmenity = {
      type: parseInt(formData.type),
      name: formData.name,
      isChecked: formData.isChecked,
    };
    axios
      .post('https://localhost:7249/api/Amenity/add', newAmenity)
      .then((response) => {
        if (response.data.success) {
          setError(null);
          console.log('Connect:', response.data.message);
          const updatedData = [...data, { ...response.data.data, category: getCategoryLabel(response.data.data.type) }];
          setData(updatedData);
          setSuccess(response.data.message);
          setFormData({
            type: '',
            name: '',
            isChecked: false,
          });
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error adding Amenity:', error);
        setError(error);
        setSuccess(null);
      });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'category', // Hiển thị trường category thay vì type
      headerName: 'Category',
      width: 130,
    },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'isChecked', headerName: 'Allows', width: 130 },
  ];

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleDeleteAction(params.row.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  // Hàm để lọc dữ liệu theo danh mục
  const filterDataByCategory = () => {
    if (selectedCategory === 'All') {
      return data; // Hiển thị tất cả khi chọn "All"
    }
    return data.filter((item) => item.category === selectedCategory);
  };

  // Hàm để lấy nhãn danh mục dựa vào giá trị type
  const getCategoryLabel = (type) => {
    switch (type) {
     
      case AmenityType.General:
        return 'General';
      case AmenityType.Other:
        return 'Other';
      case AmenityType.Safe:
        return 'Safe';
      default:
        return '';
    }
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column'  }}>
      <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333',
          textAlign: 'center', // Align text in the center
          marginBottom: '20px'
        }}>
          List Amenity
        </h2>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>
         
          <label style={{ marginRight: '15px' }}> {/* Add spacing between elements */}
            <span>ᴄᴀᴛᴇɢᴏʀʏ:</span>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                width: '300px',
                marginLeft: '15px' // Add spacing between label text and the select box
              }}  
            >
                <option value={AmenityType.Choose}>Choose</option>
              <option value={AmenityType.General}>General</option>
              <option value={AmenityType.Other}>Other</option>
              <option value={AmenityType.Safe}>Safe</option>
            </select>
          </label>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                width: '300px',
                marginRight: '5px',
                marginLeft: '10px' // Add spacing between input and checkbox
              }}
            />
            <input
              type="checkbox"
              name="isChecked"
              checked={formData.isChecked}
              onChange={handleInputChange}
            />
            Allows
          </label>
          <div style={{ marginRight: '10px' }}> {/* Add spacing between elements */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddAmenity}
              style={{
                backgroundColor: 'green',
                color: 'white',
                marginLeft: '10px' // Add spacing between input and checkbox
         
              }}
            >
             <AddTwoToneIcon/>
            </Button>
          </div>
        </div>
        {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <div style={{ marginBottom: '10px', width: '100%' }}> {/* Stretch the filter list dropdown to full width */}
        {/* Dropdown for filter list */}
        <select
          name="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            marginBottom: '10px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '20%' // Make dropdown full width
          }}
        >
            <option value="All">All</option>
            <option value="General">General</option>
            <option value="Other">Other</option>
            <option value="Safe">Safe</option>
          </select>
        </div>
        <div style={{ height: 400, width: '100%' }}>
          {/* Sử dụng kết quả lọc thay vì data */}
          <DataGrid rows={filterDataByCategory()} columns={columns.concat(actionColumn)} />
        </div>
      </div>
    </>
  );
};

export default AmenittyTable;
