import React, { useEffect } from 'react'
import MetaData from '../Layouts/MetaData'
import BackdropLoader from '../Layouts/BackdropLoader'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { Rating } from '@mui/material'
import Actions from './Actions'
import {clearErrors,deleteInstructor,getAdminInstructors} from '../../actions/instructorAction'
import {DELETE_INSTRUCTOR_RESET} from '../../constants/instructorConstants'


const InstructorTable = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { instructors, error } = useSelector((state) => state.instructors);
    const { loading, isDeleted, error: deleteError } = useSelector((state) => state.instructor);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "success" });
            dispatch(clearErrors());
        }
        if (deleteError) {
            enqueueSnackbar(deleteError, { variant: "error" });
            dispatch(clearErrors())
        }
        if (isDeleted) {
            enqueueSnackbar("Product Deleted Successfully", { variant: "success" })
            dispatch({ type: DELETE_INSTRUCTOR_RESET });
        }
        dispatch(getAdminInstructors());
    }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

    const deleteInstructorHandler = (id) =>{
        dispatch(deleteInstructor(id));
    }


    const columns = [
        {
            field: "id",
            headerName: "Instructor ID",
            minWidth: 100,
            flex: 0.5
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 100,
            flex: 0.5
        },
        {
            field: "experience",
            headerName: "Experience",
            minWidth: 100,
            flex: 0.5
        },
        {
            field: "expert",
            headerName: "Expert",
            minWidth: 100,
            flex: 0.5
        },
        {
            field: "profile",
            headerName: "Profile",
            minWidth: 100,
            flex: 0.5
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 100,
            flex: 0.5
        },
        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 100,
            flex: 0.1,
            align: "left",
            headerAlign: "left",
            renderCell: (params) => {
                return <Rating readOnly value={params.row.rating} size="small" precision={0.5} />
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            flex: 0.3,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    console.log("editRoute++"),
                    <Actions editRoute={"instructor"} deleteHandler={deleteInstructorHandler} id={params.row.id} />
                )
            },
        },
    ];

    const rows = [];
    // console.log("instructors:",instructors)
    instructors && instructors.forEach((item) => {
        rows.unshift({
            id: item._id,
            name: item.name,
            experience: item.experience,
            expert: item.expert,
            profile: item.profile,
            status: item.status
        })
    })
    return (
        <>
            <MetaData title="Admin Products | Flipkart" />

            {loading && <BackdropLoader />}

            <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium uppercase">Instructors</h1>
                <Link to="/admin/new_instructor" className="py-2 px-4 rounded shadow font-medium text-white bg-primary-blue hover:shadow-lg">New Instructor</Link>
            </div>
            <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 470 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectIconOnClick
                    sx={{
                        boxShadow: 0,
                        border: 0,
                    }}
                />
            </div>
        </>
    )
}

export default InstructorTable
