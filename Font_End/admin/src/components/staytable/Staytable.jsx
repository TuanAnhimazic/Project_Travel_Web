import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx'

const Staytable = () => {


  const [data, setData] = useState([]);


  //set dadabase
  useEffect(() => {
    getData(
    );
  }, [])



  //actionbutton
  const getData = () => {
    axios
      .get('https://localhost:7249/api/Stay/GetListStay')
      .then((result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
  }

  const handleApprove = (id) => {
    const updatedStatus = 1;
    axios.put(`https://localhost:7249/api/stay/UpdateStatus/${id}`, updatedStatus, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response && response.data) {
          // For example, you might want to log a message from the response
          console.log("Response from server:", response.data.message);
        }
        toast.success("Stay approved successfully");
  
        // Update the state to reflect the change in the UI
        setData(data.map(stay => stay.id === id ? { ...stay, status: 1 } : stay));
      })
      .catch(error => {
        console.error("Error in approving stay:", error);
        toast.error("Error in approving stay");
      });
  };

  const handleReject = (id) => {
    const updatedStatus = 2;
    axios.put(`https://localhost:7249/api/stay/UpdateStatus/${id}`, updatedStatus, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response && response.data) {
          // For example, you might want to log a message from the response
          console.log("Response from server:", response.data.message);
        }
        toast.success("StayRejected successfully");
  
        // Update the state to reflect the change in the UI
        setData(data.map(stay => stay.id === id ? { ...stay, status: 2 } : stay));
      })
      .catch(error => {
        console.error("Error in Reject stay:", error);
        toast.error("Error in Reject stay");
      });
  };
 
  const downloadExcel = (data) => {
    // Convert data to an array of arrays
    const dataArray = data.map(item => [
      item.id,
      item.fullName,
      item.phoneNumber,
      item.address,
      item.email
    ]);
  
    const worksheet = XLSX.utils.aoa_to_sheet([columns.map(col => col.headerName), ...dataArray]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Stays');
  
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'Stay.xlsx';
    document.body.appendChild(link);
    link.click();
  };


  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'featuredImage',
      headerName: 'Featured Image',
      width: 130,
      renderCell: (params) => {
        const imageUrl = `https://localhost:7249/Images/${params.row.featuredImage}`;
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <img
              src={imageUrl}
              alt={params.row.title}
              style={{
                maxWidth: '100%',
                maxHeight: 50,
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
          </div>
        );
      }
    },
    { field: 'title', headerName: 'Title', width: 170 },
    { field: 'address', headerName: 'Address', width: 170 },
    { field: 'description', headerName: 'Description', width: 170 },
    {
      field: 'category',
      headerName: 'Category Type',
      width: 150,
      valueGetter: (params) => params.row.category?.propertyType || 'N/A',
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
      valueGetter: (params) => {
        const basePrice = params.row.price?.basePrice || 'N/A';
        const currency = params.row.price?.currency || '';
        return `${basePrice} ${currency}`.trim();
      },
    },
   
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        switch (params.row.status) {
          case 0: // Pending
            return (
              <>
                <Button variant="contained"  color="primary" onClick={() => handleApprove(params.row.id)}>
                  Approve
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleReject(params.row.id)}>
                  Reject
                </Button>
               
              </>
            );
          case 1: // Approved
            return <Button variant="contained" disabled>Approved</Button>;
          case 2: // Rejected
            return <Button variant="contained" disabled>Rejected</Button>;
          default:
            return null;
        }
      },
    },

  ];
  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Link to ViewDetail with the stay ID as a URL parameter */}
            <Link to={`/viewdetail/${params.row.id}`} style={{ textDecoration: "none" }}>
              <Button variant="outlined">View Detail</Button>
            </Link>
          </div>
           
        );
      },
    },
  ];

  const onDownloadExcel = () => {
    downloadExcel(data);
  };


  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
       <Button variant="outlined" onClick={onDownloadExcel}>
            Download Excel
          </Button>
    </div>

  );
};
export default Staytable;