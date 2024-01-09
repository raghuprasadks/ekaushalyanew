import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails } from '../../actions/orderAction';
import { getProductDetails } from '../../actions/productAction';
import Loader from '../Layouts/Loader';
import MetaData from '../Layouts/MetaData';

const OrderDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { enqueueSnackbar } = useSnackbar();
  const { product, loading: productLoading, error: productError } = useSelector((state) => state.productDetails);

  const [videoUrl,setVideoUrl]=useState()
  //setVideoUrl(product.introductoryvideo)

  useEffect(() => {
    console.log('use effect 1')
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(params.id));
  }, [dispatch, error, params.id, enqueueSnackbar]);

  useEffect(() => {
 
    console.log('use effect 2',order)
    if (order && order.orderItems && order.orderItems.length > 0) {
      const productId = order.orderItems[0].product;
      console.log('product id ',productId)
      if (productId) {
        dispatch(getProductDetails(productId));
        setVideoUrl(`https://www.youtube.com/embed/${product.introductoryvideo}`)
      }
    }
  }, [dispatch, order]);

  if (loading) {
    return <Loader />;
  }

  if (!order || !order.orderItems || order.orderItems.length === 0) {
    return <div>No order data available</div>;
  }

  const renderVideo = (url) => (
   // console.log("rendervideo ",url)
    //setVideoUrl(url)   
  <iframe width="100%" height="315" src={url} title="Video Player" allowFullScreen />

  )

  if (error || productError) {
    return <div>Error loading data</div>;
  }

  if (productLoading || !product) {
    return <Loader />;
  }
  
  return (
    <>
      <MetaData title="Order Details | Flipkart" />
      <main className="w-full mt-14 sm:mt-4 flex gap-4 max-w-6xl mx-auto">
        <div className="w-1/2">
          {order && order.orderItems && order.orderItems.length > 0 && order.orderItems[0].product && (
            <>
              <h1 className="px-6 py-4 border-b text-2xl font-medium">
                {order.orderItems[0].product.name}
              </h1>
              <div className="p-6">
            {/**   {product && product.introductoryvideo && renderVideo(`https://www.youtube.com/embed/${product.introductoryvideo}`)}  */}
              
              <iframe width="100%" height="315" src={videoUrl} title="Video Player" allowFullScreen />

              </div>
            </>
          )}
        </div>

        <div className="w-1/2">
          {product && product.specifications && product.specifications.length > 0 && (
            <div>
              <h2 className="text-xl font-medium mb-4">Specifications Videos</h2>
              {product.specifications.map((spec, i) => (
                <div key={i} className="mb-4">
                  <h3 className="text-lg font-medium">{spec.title}</h3>
                  {spec.videourl && (
                    <button
                      onClick={() => {
                       let updVideoUrl = `https://www.youtube.com/embed/${spec.videourl}`;
                       // dispatch({ type: 'SET_CURRENT_VIDEO', payload: videoUrl });
                       setVideoUrl(updVideoUrl)
                    }}
                      className="text-primary-blue cursor-pointer"
                    >
                      Watch Video
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
                    }

export default OrderDetails;