const Razorpay = require('razorpay');
const { v4: uuidv4 } = require('uuid');
const Payment = require('../models/paymentModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


exports.processPayment = asyncErrorHandler(async (req, res, next) => {
   console.log("processPayment")
    const { amount, email, phoneNo } = req.body;

    const options = {
        amount: amount * 100, 
        currency: 'INR',
        receipt: `oid${uuidv4()}`,
        payment_capture: 1,
        notes: {
            email,
            phoneNo,
        },
    };

    try {
        const order = await new Promise((resolve, reject) => {
            razorpay.orders.create(options, (err, order) => {
                if (err) {
                    reject(new ErrorHandler('Razorpay Order Creation Failed', 500));
                } else {
                    resolve(order);
                }
            });
        });

        const razorpayPayment = new Payment({
            orderId: order.id,
            amount: order.amount / 100,
            txnDate: new Date(),
            refundAmt: '0',
            paymentMode: 'Online', 
            bankName: 'SBI',
            gatewayName: 'Razorpay', 
            txnType: 'Payment', 
            txnAmount: amount, 
            txnId: order.id, 
            resultInfo: {
                resultStatus: 'TXN_SUCCESS', 
                resultCode: '0', 
                resultMsg: 'Payment successful', 
            }
           
        });
        
        await razorpayPayment.save();

       // res.redirect(`${req.protocol}://${req.get("host")}/order/${order.orderId}`)
        
        res.status(200).json({
            razorpayOptions:{
                key:process.env.RAZORPAY_KEY_ID,
            orderId: order.id,
            amount: order.amount / 100,
            currency: order.currency,
            }
        });
         
    } catch (error) {
        setPayDisable(false);
        setError(error.message || 'An error occurred');
    }
});




exports.razorpayCallback = asyncErrorHandler(async (req, res, next) => {
    console.log("razorpayCallback####")
    console.log("request body ",req.body)
    console.log("order id ",req.body.razorpay_order_id)
    //let url = `http://${req.get("host")}/order/${req.body.razorpay_order_id}`
    //console.log("url ##",url)
    //res.setHeader("Content-Type", "text/html")
    //res.setHeader("Content-Type", "text/html")
    //res.redirect(`/order/${req.body.razorpay_order_id}`)
    //res.end()
    //window.location.href = url
    //return
    res.status(200).json({ orderid: req.body.razorpay_order_id });
});

/**
exports.getRazorpayPaymentStatus = asyncErrorHandler(async (req, res, next) => {
    const orderId = req.params.id;
    console.log("Order status :: order id ##",orderId)

    const razorpayPayment = await Payment.findOne({ orderId });

    if (!razorpayPayment) {
        return next(new ErrorHandler('Razorpay Payment Details Not Found', 404));
    }

    res.status(200).json({
        success: true,
        paymentDetails: {
            orderId: razorpayPayment.orderId,
            amount: razorpayPayment.amount,
        },
    });
});

 */
exports.getRazorpayPaymentStatus = asyncErrorHandler(async (req, res, next) => {

    const payment = await Payment.findOne({ orderId: req.params.id });

    if (!payment) {
        return next(new ErrorHandler("Payment Details Not Found", 404));
    }

    const txn = {
        id: payment.txnId,
        status: payment.resultInfo.resultStatus,
    }

    res.status(200).json({
        success: true,
        txn,
    });
});
