
import './App.css';
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Routes, Route, useParams, useNavigate} from "react-router-dom";


const formValidationSchema= yup.object({
 
  id:yup
      .number()
      .required("why not fill tis field🎃"),
 
})


function App() {
  
 
  return (
    <div className="App">
       <Routes>
            

            

            <Route path="/"  element={<User />}/>
            <Route path="/users/:id"  element={<Userdetails/>}/>
          

           

           
            
          </Routes>   
    </div>
    
  );
}
function User(){
  const navigate=useNavigate();
  const [id, setId] =useState({});

  const formik = useFormik({
    initialValues: {id:''},
    // validate: validateForm,
    validationSchema: formValidationSchema,
    onSubmit: (id) => {
      console.log(id.id)
      setId(id);
      navigate(`/users/${id.id}`)

    }
  });

  return(
<div className="App">
       <form  onSubmit={formik.handleSubmit} className='add-movie-form'>
          <TextField
            id="id"
            name="id"
            value={formik.values.id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label='Enter the id'
            variant="standard" 
            error={formik.errors.id && formik.touched.id}
            helperText={formik.errors.id && formik.touched.id && formik.errors.id}/>
     

     <Button variant="outlined" type='submit'>Search</Button>
      </form>
      
      
       {/* {id ? <Userdetails id={id.id}/>:""} */}
      


      
    </div>
  );
}

function Userdetails(){
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    fetch(`http://localhost:9000/users/${id}`,{method:"GET"})
    .then((data) => data.json())
    .then((mv) => setUser(mv))
  },[id])

  console.log(user)
  return (
    <div>
      {user?<div><h1>EMP_ID: {user.id}</h1>
    <h1>Name: {user.name}</h1>
    </div>: <div><h1>No user found</h1>
    </div>}
      
      
    
   
    </div> 
  );
}
export default App;
