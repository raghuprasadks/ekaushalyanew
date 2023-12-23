import React, { useEffect, useState } from 'react'
import MetaData from '../Layouts/MetaData'
import BackdropLoader from '../Layouts/BackdropLoader'
import { TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import {createInstructor,clearErrors} from '../../actions/instructorAction'
import {CREATE_INSTRUCTOR_RESET} from '../../constants/instructorConstants'

const NewInstructor = () => {

  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();

  const {loading,success,error} = useSelector((state)=>state.newInstructor);

  const [name,setName] = useState("");
  const [experience,setExperience] = useState("");
  const [expert,setExpert] = useState("");
  const [profile,setProfile] = useState("");
  const [status,setStatus] = useState(true);

  const newInstructorSubmitHandler = (e) =>{
    e.preventDefault();

    const formData = new FormData();

    formData.set("name",name);
    formData.set("experience",experience);
    formData.set("expert",expert);
    formData.set("profile",profile);
    formData.set("status",status);

    dispatch(createInstructor(formData))
  }

  useEffect(()=>{
    if(error){
      enqueueSnackbar(error,{variant: "error"});
      dispatch(clearErrors());
    }
    if(success){
      enqueueSnackbar("Instructor Created",{variant:"success"});
      dispatch({type: CREATE_INSTRUCTOR_RESET});
      navigate("/admin/instructors");
    }
  },[dispatch,error,success,navigate,enqueueSnackbar]);
  return (
    <>
      <MetaData title="Admin: New Instructor | Flipkart" />

      {loading && <BackdropLoader />}
      <form onSubmit={newInstructorSubmitHandler} encType='multipart/form-data' className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4" id="mainform">
        <div className='flex flex-col gap-3 m-2 sm:w-1/2'>
            <TextField
              label="Name"
              variant="outlined"
              size="small"
              required
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <TextField
              label="Experience"
              variant="outlined"
              size="small"
              required
              value={experience}
              onChange={(e)=>setExperience(e.target.value)}
            />
            <TextField
              label="Area of Expert"
              variant="outlined"
              size="small"
              required
              value={expert}
              onChange={(e)=>setExpert(e.target.value)}
            />
            <TextField
              label="LinkedIn Profile"
              variant="outlined"
              size="small"
              required
              value={profile}
              onChange={(e)=>setProfile(e.target.value)}
            />
            <TextField
              label="Status"
              variant="outlined"
              size="small"
              required
              value={status}
              onChange={(e)=>setStatus(e.target.value)}
            />
            <div className='flex justify-content-center'>
              <input form="mainform" type="submit" className="bg-primary-orange uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer" value="Submit"/>
            </div>
        </div>
      </form>
    </>
  )
}

export default NewInstructor
