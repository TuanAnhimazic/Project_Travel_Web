import React, { useEffect, useState, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
//import { styled } from '@mui/system';
import { TextField, Typography, Button} from '@mui/material';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'
import '../../pages/rules/Rules.scss';


//Table
const RulesTable = () => {

  const [data, setData] = useState([]);
  const [newRule, setNewRule] = useState({
    rule:'',
    isAllowed:false,
    isChargeable:false
  });
  const [pageSize, setPageSize] = useState(5);
  const [error, setError] = useState("");
  const isMountedRef = useRef(true);

  useEffect(() => {
    getData();
    return () => {
      isMountedRef.current = false;
    };
  
  }, [])

  const validateData = (data) => {
    if (!data.rule || data.rule.trim() === "") {
      setError("Rule is required");
      return false;
    }
    if (data.rule.trim().length > 20) {
      setError("Rule cannot be longer than 20 characters");
      return false;
    }
    setError("");
    return true;
  };


  const getData = () => {
    axios
      .get('https://localhost:7249/api/StayRule/listRule')
      .then((result) => {
        if (isMountedRef.current) {
          setData(result.data.data);
          console.log(result.data);
        }
        
      })
      .catch((error) => {
        if (isMountedRef.current) {
          console.error('Error fetching data:', error);
        }
        
      });
  }


const handleDelete = (id) => {

  const shouldDelete = window.confirm('Do you want to delete?');
  if(shouldDelete){

    axios.delete(`https://localhost:7249/api/StayRule/delete/${id}`)
    .then((response) => {
       if(response.data.success){
        setData(data.filter(item => item.id !== id));
        
       } else{

        setError(response.data.message)
       }
    })
    .catch((error) => {
      console.error('Error deleting rule:', error);
      setError(error);
    });
    

  }
 
};

const handleAddData = () => {

  if (validateData(newRule)) {
    axios.post('https://localhost:7249/api/StayRule/add', newRule)
    .then((response) => {
      
  
      if(response.data.success){
        setData([...data, response.data.data]); 
        setNewRule({ rule: '', isAllowed: false, isChargeable: false });
      }else{

        setError(response.data.message);
      }
      
    })
    .catch((error) => {
      console.error('Error adding new rule:', error);
      setError(error);
    });
  }
 
};
const handleInputChange = (event) => {
  const { name, value} = event.target;
  setNewRule(prev => ({
    ...prev,
    [name]:  value
  }));
};

 
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 }, 
    { field: 'rule', headerName: 'Rule', width: 130 },
    {
      field: 'isAllowed',
      headerName: 'Is Allowed',
      width: 130,
      renderCell: (params) => (
        <span>
          {params.row.isAllowed ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      field: 'isChargeable',
      headerName: 'Is Chargeable',
      width: 130,
      renderCell: (params) => (
        <span>
          {params.row.isChargeable ? 'Yes' : 'No'}
        </span>
      ),
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
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={() => handleDelete(params.row.id)}          
          >
            Delete
          </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
     <div className="styledDiv">
        <Typography variant="h4" gutterBottom>
          List Rules
        </Typography>
        <div className="formContainer">
          {/* Form inputs and button */}
       
          <TextField
            label="New Rule"
            name="rule"
            variant="outlined"
            value={newRule.rule}
            onChange={handleInputChange}
            inputProps={{ maxLength: 20 }}
            style={{ marginRight: '10px',
            width: '200px',
            marginLeft: '10px',
            hight:'1px'
            
          }}
          />
          <Button variant="contained" color="primary" onClick={handleAddData}>
            Add Rule
          </Button>
          </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div className="styledDataGridContainer">
        <DataGrid
          rows={data}
          columns={columns.concat(actionColumn)}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          checkboxSelection
          disableSelectionOnClick
        />
        </div>
      </div>
      
  </>
  );


};
export default RulesTable;