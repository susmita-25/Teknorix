import React, { useEffect, useState } from 'react';
import './App.css';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';


function App() {
  const [dept, setDept] = useState(null)
  const [loc, setLoc] = useState(null)
  const [fun, setFun] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const [functionList, setFunctionList] = useState([])
  const [department, setDepartment] = useState([]);
  const [location, setLocation] = useState([]);
  const [jobList, setJobList] = useState([])
  const [globalJobList, setGlobalJobList] = useState([])
  const [chipData, setChipData] = React.useState([]);



  const handleDepartmentChange = (event) => {
    let temp = (event.target.value)
    chipData.push({key:temp,label:temp,type:'dept'});
    setChipData(chipData);
    setDept(temp);
    let tempJobList = [];
    if (temp) {
      tempJobList = jobList.filter((job) => {
        if (job.department)
          return job.department.title === temp;
      });
    }
    setJobList(tempJobList);

  };

  const handleLocationChange = (e) => {
    const temp = (e.target.value)
    chipData.push({key:temp,label:temp,type:'loc'});
    setChipData(chipData);
    setLoc(temp);
    let tempJobList = [];
    if (temp) {
      tempJobList = jobList.filter((job) => {
        if (job.location)
          return job.location.city === temp;
      });
    }
  setJobList(tempJobList);
};

const handleFunctionChange = (e) => {
  const temp = (e.target.value)
  chipData.push({key:temp,label:temp,type:'fun'});
    setChipData(chipData);
  setFun(temp);
  let tempJobList = [];
  if (temp) {
    tempJobList = jobList.filter((job) => {
      if (job.function)
        return job.function.title === temp;
    });
  }
  setJobList(tempJobList);
};
const resetForm = () => {
  setDept(null);
  setFun(null);
  setLoc(null)
  setJobList(globalJobList);

}

const handleSearchInput = (e) => {
  setSearchInput(e.target.value)
}

const getJobList = async () => {
  const { data } = await Axios.get(
    "https://teknorix.jobsoid.com/api/v1/jobs"
  );
  const jobList = data;
  setJobList(jobList);
  setGlobalJobList(jobList)
  console.log(jobList);
};

const getDepartmentList = async () => {
  const { data } = await Axios.get(
    "https://teknorix.jobsoid.com/api/v1/departments"
  );
  const department = data;
  setDepartment(department);
  console.log(department);
};

const getLocationList = async () => {
  const { data } = await Axios.get(
    "https://teknorix.jobsoid.com/api/v1/locations"
  );
  const location = data;
  setLocation(location);
  console.log(location);
};

const getFunctionList = async () => {
  const { data } = await Axios.get(
    "https://teknorix.jobsoid.com/api/v1/functions"
  );
  const functionList = data;
  setFunctionList(functionList);
  console.log(functionList);
};

const handleDelete =(data,index)=>{
  chipData.splice(index,1);

  if(data.type === "fun"){
    setFun(null)
  }else if(data.type === "loc"){
    setLoc(null)
  }else if(data.type === "dept"){
    setDept(null)
  }
  if(chipData.length > 1){
    setChipData(chipData)
  }else{
    setChipData([])
  }
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

useEffect(() => {
  getJobList();
  getDepartmentList();
  getLocationList();
  getFunctionList();
}, []);

function SearchRow() {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search For Job"
            inputProps={{ 'aria-label': 'search google maps' }}
            value={searchInput == null ? '' : searchInput}
            onChange={handleSearchInput}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>

    </React.Fragment>
  );
}

function FormRow() {
  return (
    <React.Fragment>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Department</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dept}
            onChange={(e) => { handleDepartmentChange(e) }}
          >
            {department.map(department => <MenuItem key={department.id} data-state-name={department.title} value={department.title} >{department.title}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Location</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={loc}
            // disabled={dept === null}
            onChange={(e) => handleLocationChange(e)}
          >
            {location.map(location => <MenuItem key={location.id} data-state-name={location.city} value={location.city} >{location.city}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Function</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={fun}
            // disabled={loc === null}
            onChange={(e) => handleFunctionChange(e)}
          >
            {functionList.map(functionList => <MenuItem key={functionList.id} data-state-name={functionList.title} value={functionList.title} >{functionList.title}</MenuItem>)}

          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={resetForm} >Reset</Button>
      </Grid>
      <Grid item xs={12}>
      <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chipData && chipData.length > 0 && chipData.map((data,index) => {
        let icon;

        return (
          <ListItem key={data.key}>
            <Chip
            icon={icon}
              label={data.label}
              onDelete={()=>handleDelete(data,index)}
            />
          </ListItem>
        );
      })}
    </Paper>
       </Grid>
    </React.Fragment>
  );
}


return (
  <div className="App">

    <Box sx={{ flexGrow: 1, padding: 10 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <SearchRow />
        </Grid>
      </Grid>
    </Box>


    <Box sx={{ flexGrow: 1, padding: 10 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </Box>


    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sr.No</TableCell>
            <TableCell align="right">Title</TableCell>
            {/* <TableCell align="right">Description</TableCell> */}
            <TableCell align="right">Department</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Function</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobList.map((row, index) => (
            <TableRow
              key={index}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{row.title}</TableCell>
              {/* <TableCell align="right">{row.description}</TableCell> */}
              <TableCell align="right">{row.department.title}</TableCell>
              <TableCell align="right">{row.location.city}</TableCell>
              <TableCell align="right">{row.function.title}</TableCell>
              <TableCell align="right">
               <Button variant="contained" style={{margin:5}} >
               <a href={row.applyUrl} target="_blank" rel="noopener noreferrer">Apply</a>
                </Button> 
              <Button variant="contained" style={{backgroundColor:'red'}} >View</Button> 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);
}

export default App;
