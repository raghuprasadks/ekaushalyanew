import axios from 'axios';
import {
    ALL_INSTRUCTOR_REQUEST,
    ALL_INSTRUCTOR_SUCCESS,
    ALL_INSTRUCTOR_FAIL,

    INSTRUCTOR_DETAILS_REQUEST,
    INSTRUCTOR_DETAILS_SUCCESS,
    INSTRUCTOR_DETAILS_FAIL,

    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAIL,

    ADMIN_INSTRUCTOR_REQUEST,
    ADMIN_INSTRUCTOR_SUCCESS,
    ADMIN_INSTRUCTOR_FAIL,

    CREATE_INSTRUCTOR_REQUEST,
    CREATE_INSTRUCTOR_SUCCESS,
    CREATE_INSTRUCTOR_FAIL,

    UPDATE_INSTRUCTOR_REQUEST,
    UPDATE_INSTRUCTOR_SUCCESS,
    UPDATE_INSTRUCTOR_FAIL,

    DELETE_INSTRUCTOR_REQUEST,
    DELETE_INSTRUCTOR_SUCCESS,
    DELETE_INSTRUCTOR_FAIL,

    ALL_CHECKS_REQUEST,
    ALL_CHECKS_SUCCESS,
    ALL_CHECKS_FAIL,

    DELETE_CHECKS_REQUEST,
    DELETE_CHECKS_SUCCESS,
    DELETE_CHECKS_FAIL,

    SLIDER_INSTRUCTOR_REQUEST,
    SLIDER_INSTRUCTOR_SUCCESS,
    SLIDER_INSTRUCTOR_FAIL,

    CLEAR_ERRORS
} from '../constants/instructorConstants';


// Get All Instructors ---Filters/Search/Sort
export const getInstructors = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_INSTRUCTOR_REQUEST });
        const { data } = await axios.get(`/api/v1/instructors`);

        dispatch({
            type: ALL_INSTRUCTOR_SUCCESS,
            payload: data,
        })
    }
    catch (error) {
        dispatch({
            type: ALL_INSTRUCTOR_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Get All Instructors of same Category
export const getSimilarInstructor = (category) => async (dispatch) => {
    try {
        dispatch({ type: ALL_INSTRUCTOR_REQUEST });

        const { data } = await axios.get(`/api/v1/instructors?category=${category}`);

        dispatch({
            type: ALL_INSTRUCTOR_SUCCESS,
            payload: data,
        })
    }
    catch (error) {
        dispatch({
            type: ALL_INSTRUCTOR_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Get Instructor Details
export const getInstructorDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: INSTRUCTOR_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/instructor/${id}`);
        console.log(data.data)
        dispatch({
            type: INSTRUCTOR_DETAILS_SUCCESS,
            payload: data.data,
        })
        console.log(data.instructor)
    }
    catch (error) {
        dispatch({
            type: INSTRUCTOR_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
}

// New/Update Checks
export const newCheck = (checkData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_REVIEW_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.put("/api/v1/checks", checkData, config);

        dispatch({
            type: CREATE_REVIEW_SUCCESS,
            payload: data.success,
        })
    }
    catch (error) {
        dispatch({
            type: CREATE_REVIEW_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Get All Instructors ---ADMIN
export const getSliderInstructors = () => async (dispatch) => {
    try {
        dispatch({ type: SLIDER_INSTRUCTOR_REQUEST });

        const { data } = await axios.get('/api/v1/instructors/all');

        dispatch({
            type: SLIDER_INSTRUCTOR_SUCCESS,
            payload: data.instructors,
        })
    }
    catch (error) {
        dispatch({
            type: SLIDER_INSTRUCTOR_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get All Instructors ---ADMIN
export const getAdminInstructors = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_INSTRUCTOR_REQUEST });

        const { data } = await axios.get('/api/v1/admin/instructors');
        // console.log("getAdminInstructors##",data)

        dispatch({
            type: ADMIN_INSTRUCTOR_SUCCESS,
            payload: data.instructors,
        })
    }
    catch (error) {
        dispatch({
            type: ADMIN_INSTRUCTOR_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const createInstructor = (instructorData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_INSTRUCTOR_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.post('/api/v1/admin/instructor/new', instructorData, config);

        dispatch({
            type: CREATE_INSTRUCTOR_SUCCESS,
            payload: data,
        })
    }
    catch (error) {
        dispatch({
            type: CREATE_INSTRUCTOR_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const updateInstructor = (id, instructorData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_INSTRUCTOR_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`/api/v1/admin/instructor/${id}`, instructorData, config);

        dispatch({
            type: UPDATE_INSTRUCTOR_SUCCESS,
            payload: data.success,
        })
    }
    catch (error) {
        dispatch({
            type: UPDATE_INSTRUCTOR_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const deleteInstructor = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_INSTRUCTOR_REQUEST });
        const { data } = await axios.delete(`/api/v1/admin/instructor/${id}`);

        dispatch({
            type: DELETE_INSTRUCTOR_SUCCESS,
            payload: data.success,
        })
    }
    catch (error) {
        dispatch({
            type: DELETE_INSTRUCTOR_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Get Instructor Reviews ---ADMIN
export const getAllChecks = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_CHECKS_REQUEST });
        const { data } = await axios.get(`/api/v1/admin/checks?id=${id}`);

        dispatch({
            type: ALL_CHECKS_SUCCESS,
            payload: data.checks,
        })
    }
    catch (error) {
        dispatch({
            type: ALL_CHECKS_FAIL,
            payload: error.response.data.message,
        })
    }
}


// Get Product Checks ---ADMIN
export const deleteChecks = (checkId, instructorId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CHECKS_REQUEST });
        const { data } = await axios.delete(`/api/v1/admin/checks?id=${checkId}&instructorId=${instructorId}`);

        dispatch({
            type: DELETE_CHECKS_SUCCESS,
            payload: data.success,
        })
    }
    catch (error) {
        dispatch({
            type: DELETE_CHECKS_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}

// import axios from "axios";
// import {
//     CREATE_INSTRUCTOR_REQUEST,
//     CREATE_INSTRUCTOR_SUCCESS,
//     CREATE_INSTRUCTOR_FAIL,

//     UPDATE_INSTRUCTOR_REQUEST,
//     UPDATE_INSTRUCTOR_SUCCESS,
//     UPDATE_INSTRUCTOR_FAIL,

//     GET_INSTRUCTOR_REQUEST,
//     GET_INSTRUCTOR_SUCCESS,
//     GET_INSTRUCTOR_FAIL,

//     GET_INSTRUCTORS_REQUEST,
//     GET_INSTRUCTORS_SUCCESS,
//     GET_INSTRUCTORS_FAIL,

//     DELETE_INSTRUCTOR_REQUEST,
//     DELETE_INSTRUCTOR_SUCCESS,
//     DELETE_INSTRUCTOR_FAIL,

//     CLEAR_ERRORS
// } from "../constants/instructorConstants"


// export const getInstructor = (id) => async (dispatch) =>{
//     try{
//         dispatch({type: GET_INSTRUCTOR_REQUEST});

//         const {data} = await axios.get(`/api/v1/instructor/${id}`);
//         console.log(data)
//         dispatch({
//             type: GET_INSTRUCTOR_SUCCESS,
//             payload: data.instructors,
//         })
//     }
//     catch (error){
//         dispatch({
//             type: GET_INSTRUCTOR_FAIL,
//             payload: error.response.data.message,
//         })
//     }
// }


// export const createInstructor = (instructordata) => async (dispatch) =>{
//     console.log('instructordata')
//     try{
//         dispatch({type: CREATE_INSTRUCTOR_REQUEST});
//         const config = {header: {"Content-Type": "application/json"}}
//         const {data} = await axios.post('/api/v1/create',instructordata,config);

//         dispatch({
//             type: CREATE_INSTRUCTOR_SUCCESS,
//             payload: data,
//         })
//     }
//     catch (error){
//         dispatch({
//             type: CREATE_INSTRUCTOR_FAIL,
//             payload: error.response.data.message
//         })
//     }
// }

// export const getInstructors = () => async (dispatch) =>{
//     console.log('getInstructor 2')
//     try{
//         dispatch({type: GET_INSTRUCTORS_REQUEST});

//         const {data} = await axios.get('/api/v1/instructor');

//         dispatch({
//             type: GET_INSTRUCTORS_SUCCESS,
//             payload: data.instructors,
//         })
//     }
//     catch (error){
//         dispatch({
//             type: GET_INSTRUCTORS_FAIL,
//             payload: error.response.data.message,
//         })
//     }
// }

// export const updateInstructors = (id,instructordata) => async (dispatch) =>{
//     try{
//         dispatch({type: UPDATE_INSTRUCTOR_REQUEST});
//         const config = {header: {"Content-Type" : "application/json"}}
//         const {data} = await axios.put(`/api/v1/instructor/${id}`,instructordata,config);

//         dispatch({
//             type: UPDATE_INSTRUCTOR_SUCCESS,
//             payload: data.success,
//         })
//     }
//     catch (error){
//         dispatch({
//             type: UPDATE_INSTRUCTOR_FAIL,
//             payload: error.response.data.message,
//         })
//     }
// }


// export const deleteInstructors = (id) => async (dispatch) =>{
//     try{
//         dispatch({type: DELETE_INSTRUCTOR_REQUEST});
//         const {data} = await axios.delete(`/api/v1/instructor/${id}`);

//         dispatch({
//             DELETE_INSTRUCTOR_SUCCESS,
//             payload: data.success,
//         })
//     }
//     catch (error){
//         dispatch({
//             type: DELETE_INSTRUCTOR_FAIL,
//             payload: error.response.data.message,
//         })
//     }
// }

// export const clearErrors = () => (dispatch) => {
//     dispatch({type: CLEAR_ERRORS});
// }