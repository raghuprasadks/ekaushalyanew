import React, { useEffect, useState } from 'react'
import MetaData from '../Layouts/MetaData'
import BackdropLoader from '../Layouts/BackdropLoader'
import { TextField } from '@mui/material'
import { updateInstructor, clearErrors, getInstructorDetails } from '../../actions/instructorAction'
import { useSnackbar } from 'notistack'
import { REMOVE_INSTRUCTOR_DETAILS, UPDATE_INSTRUCTOR_RESET } from '../../constants/instructorConstants'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateInstructor = () => {

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const { loading, instructor, error } = useSelector((state) => state.instructorDetails);
    const { loading: updateLoading, isUpdated, error: updateError } = useSelector((state) => state.instructor);

    const [name, setName] = useState("");
    const [experience, setExperience] = useState("");
    const [expert, setExpert] = useState("");
    const [profile, setProfile] = useState("");
    const [status, setStatus] = useState(true);

    const newInstructorSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.set("name", name);
        formData.set("experience", experience);
        formData.set("expert", expert);
        formData.set("profile", profile);
        formData.set("status", status);

        dispatch(updateInstructor(params.id, formData));
    }

    const instructorId = params.id;

    useEffect(() => {
        if (instructor && instructor._id !== instructorId) {
            dispatch(getInstructorDetails(instructorId));
        }
        else if(instructor){
            setName(instructor.name);
            setExperience(instructor.experience);
            setExpert(instructor.expert);
            setProfile(instructor.profile);
            setStatus(instructor.status);
        }
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (updateError) {
            enqueueSnackbar(updateError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Instructor Updated Successfully", { variant: "success" });
            dispatch({ type: UPDATE_INSTRUCTOR_RESET });
            dispatch({ type: REMOVE_INSTRUCTOR_DETAILS });
            navigate('/admin/instructors');
        }
    }, [dispatch, error, updateError, isUpdated, instructorId, instructor, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: Update Product | Flipkart" />

            {loading && <BackdropLoader />}
            {updateLoading && <BackdropLoader />}
            <form onSubmit={newInstructorSubmitHandler} encType='multipart/form-data' className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4" id="mainform">
                <div className='flex flex-col gap-3 m-2 sm:w-1/2'>
                    <TextField
                        label="Name"
                        variant="outlined"
                        size="small"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Experience"
                        variant="outlined"
                        size="small"
                        required
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                    />
                    <TextField
                        label="Area of Expert"
                        variant="outlined"
                        size="small"
                        required
                        value={expert}
                        onChange={(e) => setExpert(e.target.value)}
                    />
                    <TextField
                        label="LinkedIn Profile"
                        variant="outlined"
                        size="small"
                        required
                        value={profile}
                        onChange={(e) => setProfile(e.target.value)}
                    />
                    <TextField
                        label="status"
                        variant="outlined"
                        size="small"
                        required
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                    <div className='flex justify-content-center'>
                        <input form="mainform" type="submit" className="bg-primary-orange uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer" value="Update" />
                    </div>
                </div>
            </form>
        </>
    )
}

export default UpdateInstructor
