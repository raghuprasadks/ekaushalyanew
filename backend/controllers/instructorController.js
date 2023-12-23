const Instructor = require('../models/instructorModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');

exports.createInstructor = asyncErrorHandler(async (req, res, next) => {
    const instructor = await Instructor.create(req.body);

    res.status(201).json({
        success: true,
        data: instructor
    });
});

exports.getInstructors = asyncErrorHandler(async (req, res, next) => {

    const instructors = await Instructor.find();
    // console.log("api:getInstructors::",instructors)
    res.status(200).json({
        success: true,
        instructors
    })
})

exports.getInstructor = asyncErrorHandler(async (req, res, next) => {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) {
        return next(new ErrorHandler(`User doesn't exist with id : ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: instructor
    })
})

exports.updateInstructors = asyncErrorHandler(async (req, res, next) => {
    const instructor = await Instructor.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!instructor) {
        return next(
            new ErrorHandler(`Instructor not found with ID: ${req.params.id}`, 404)
        );
    }

    res.status(200).json({
        success: true,
        data: instructor,
    });
})

exports.deleteInstructors = asyncErrorHandler(async (req, res, next) => {

    const instructor = await Instructor.findById(req.params.id);

    if (!instructor) {
        return next(new ErrorHandler(`User doesn't exist with id: ${req, params.id}`, 404));
    }

    await instructor.remove();
    
    res.status(200).json({
        success: true
    });
});

exports.getInstructorDetails = asyncErrorHandler(async (req, res, next) => {

    const instructor = await Instructor.findById(req.params.id);

    if (!instructor) {
        return next(new ErrorHandler(`Instructor Not Found with ID: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data:instructor
    })
});