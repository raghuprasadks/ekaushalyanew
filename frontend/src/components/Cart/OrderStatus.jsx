import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { emptyCart } from '../../actions/cartAction';
import { clearErrors, getPaymentStatus, newOrder } from '../../actions/orderAction';
import Loader from '../Layouts/Loader';

const OrderStatus = () => {
    console.log("Order Status ###")

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);

    const { loading, txn, error } = useSelector((state) => state.paymentStatus);
    const { loading: orderLoading, order, error: orderError } = useSelector((state) => state.newOrder);

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const orderData = {
        shippingInfo,
        orderItems: cartItems,
        totalPrice,
    }

    useEffect(() => {
        console.log("use effect:##::loading",loading)
        console.log("use effect:##::params",params)
        console.log("use effect:##::txn ",txn)
        if (loading === false) {
            if(txn) {
                if (txn.status === "TXN_SUCCESS") {
                    orderData.paymentInfo = {
                        id: txn.id,
                        status: txn.status,
                    };
                    console.log("new order ##",orderData)         
                    
    
                    dispatch(newOrder(orderData));
    
                } else {
                    enqueueSnackbar("Processing Payment Failed!", { variant: "error" });
                    navigate("/orders/failed");
                }
            } else {
                navigate("/cart");
            }
        }
        // eslint-disable-next-line
    }, [loading])

    useEffect(() => {

        console.log("orderLoading###",orderLoading)
        if (orderLoading === false) {
            if (order) {
                enqueueSnackbar("Order Placed", { variant: "success" });
                dispatch(emptyCart());
                navigate("/orders/success");
            } else {
                navigate("/orders");
            }
        }
        // eslint-disable-next-line
    }, [orderLoading])

    useEffect(() => {
        console.log("useeffect:error###",error)
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (orderError) {
            enqueueSnackbar(orderError, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(getPaymentStatus(params.id));
    }, [dispatch, error, orderError, params.id, enqueueSnackbar]);

    return (
        <Loader />
    );
};

export default OrderStatus;
