import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import * as XLSX from 'xlsx';



const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
    
    {
      field: 'fullName',
      headerName: 'Full name',
      width: 160,
      
    },
    {
        field: 'phoneNumber',
        headerName: 'Phone',
        type: 'number',
        width: 90,
      },
      { field: 'address', headerName: 'Address', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
  ];

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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
  
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'users.xlsx';
    document.body.appendChild(link);
    link.click();
  };
  
 

const Table= () => {

  
   const [data, setData] = useState([]);

  // const [id, setId] = useState('');
              

  //set dadabase
      useEffect(() => {
            getData(
            );
        }, [])



 //button table
 const actionColumn = [
  { field:"Action" , headerName:"Action" ,width:200 , renderCell:(params) =>{
    const Id = params.row.id; 
   return (
       <div classname="cellAction">
          <Button variant="outlined" onClick={() => handleDelete(Id)} >
               Delete
          </Button>
         
       </div>
   );
  }
}
];
    //actionbutton
    const getData = () => {
        axios
        .get('https://localhost:7249/api/Account')
        .then((result) => {
          setData(result.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        })
    } 

 
    const handleDelete = (Id) => {
      if(window.confirm ("Access Delete") === true) {
          axios.delete(`https://localhost:7249/api/Users/${Id}`)
          .then((result) => {
              if(result)
              {
                toast.success("success DELETE",result.message); 
                setData(data.filter(user => user.id !== Id));  //sau khi xoa cap nhat va loai bo doi tuong       
              } 
          })
          .catch((error) => {
            toast.error('Error fetching data:', error);
          })
      }
    }
   
    const onDownloadExcel = () => {
      downloadExcel(data);
    };
  
  return (
    <div className="datatable">
       <div className="datatableTitle">
       </div>
      <ToastContainer/>
      <div style={{ height: 400, width: '100%' }}>
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
     </div>
  
  );
};
export default Table;