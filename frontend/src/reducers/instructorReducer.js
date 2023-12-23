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
    CREATE_REVIEW_RESET,

    ADMIN_INSTRUCTOR_REQUEST,
    ADMIN_INSTRUCTOR_SUCCESS,
    ADMIN_INSTRUCTOR_FAIL,

    CREATE_INSTRUCTOR_REQUEST,
    CREATE_INSTRUCTOR_SUCCESS,
    CREATE_INSTRUCTOR_FAIL,
    CREATE_INSTRUCTOR_RESET,

    UPDATE_INSTRUCTOR_REQUEST,
    UPDATE_INSTRUCTOR_SUCCESS,
    UPDATE_INSTRUCTOR_FAIL,
    UPDATE_INSTRUCTOR_RESET,

    DELETE_INSTRUCTOR_REQUEST,
    DELETE_INSTRUCTOR_SUCCESS,
    DELETE_INSTRUCTOR_FAIL,
    DELETE_INSTRUCTOR_RESET,

    ALL_CHECKS_REQUEST,
    ALL_CHECKS_SUCCESS,
    ALL_CHECKS_FAIL,

    DELETE_CHECKS_REQUEST,
    DELETE_CHECKS_SUCCESS,
    DELETE_CHECKS_FAIL,
    DELETE_CHECKS_RESET,

    SLIDER_INSTRUCTOR_REQUEST,
    SLIDER_INSTRUCTOR_SUCCESS,
    SLIDER_INSTRUCTOR_FAIL,

    REMOVE_INSTRUCTOR_DETAILS,

    CLEAR_ERRORS
} from '../constants/instructorConstants';

export const instructorsReducer = (state = { instructors: [] }, { type, payload }) => {
    switch (type) {
        case ALL_INSTRUCTOR_REQUEST:
        case ADMIN_INSTRUCTOR_REQUEST:
        case SLIDER_INSTRUCTOR_REQUEST:
            return {
                loading: true,
                instructors: [],
            };
        case ALL_INSTRUCTOR_SUCCESS:
            return {
                loading: false,
                instructors: payload.instructors,
            }
        case ADMIN_INSTRUCTOR_SUCCESS:
        case SLIDER_INSTRUCTOR_SUCCESS:
            return {
                loading: false,
                instructors: payload,
            }
        case ALL_INSTRUCTOR_FAIL:
        case ADMIN_INSTRUCTOR_FAIL:
        case SLIDER_INSTRUCTOR_FAIL:
            return {
                loading: false,
                error: payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const instructorDetailsReducer = (state = { instructor: {} }, { type, payload }) => {
    console.log("instructorDetailsReducer:")
    switch (type) {
        case INSTRUCTOR_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case INSTRUCTOR_DETAILS_SUCCESS:
            return {
                loading: false,
                instructor: payload,
            }
        case INSTRUCTOR_DETAILS_FAIL:
            return {
                loading: false,
                error: payload,
            }
        case REMOVE_INSTRUCTOR_DETAILS:
            return {
                ...state,
                instructor: {},
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}

// New Checks Reducer
export const newChecksReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case CREATE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CREATE_REVIEW_SUCCESS:
            return {
                loading: false,
                success: payload,
            };
        case CREATE_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        case CREATE_REVIEW_RESET:
            return {
                ...state,
                success: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}

// New Instructor Reducer
export const newInstructorReducer = (state = { instructor: {} }, { type, payload }) => {
    switch (type) {
        case CREATE_INSTRUCTOR_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CREATE_INSTRUCTOR_SUCCESS:
            console.log("CREATE_INSTRUCTOR_SUCCESS##",payload)
            return {
                loading: false,
                success: payload.success,
                instructor: payload.data,
            }
        case CREATE_INSTRUCTOR_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case CREATE_INSTRUCTOR_RESET:
            return {
                ...state,
                success: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}


// New Instructor Reducer
export const instructorReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case UPDATE_INSTRUCTOR_REQUEST:
        case DELETE_INSTRUCTOR_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_INSTRUCTOR_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: payload,
            }
        case DELETE_INSTRUCTOR_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: payload,
            }
        case UPDATE_INSTRUCTOR_FAIL:
        case DELETE_INSTRUCTOR_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        case UPDATE_INSTRUCTOR_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case DELETE_INSTRUCTOR_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}

export const instructorChecksReducer = (state = { checks: [] }, { type, payload }) => {
    switch (type) {
        case ALL_CHECKS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ALL_CHECKS_SUCCESS:
            return {
                loading: false,
                checks: payload,
            }
        case ALL_CHECKS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}

export const checkReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case DELETE_CHECKS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DELETE_CHECKS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        case DELETE_CHECKS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        case DELETE_CHECKS_RESET:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}