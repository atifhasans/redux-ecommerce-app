import { CircularProgress, Typography, Grid, Box, Paper, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../Config/redux/reducers/cartSlice';

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getData();
  }, [id]);

  async function getData() {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const dispatch = useDispatch()

  const addtocartItem = () => {
    console.log(product);
    dispatch(addItem(product))
    
  }
  return (
    <Box p={3} display="flex" justifyContent="center" alignItems="center" minHeight="95vh" sx={{ backgroundColor: '#f4f6f8' }}>
      {error && <Typography color="error">Error in fetching data</Typography>}
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Box>
      )}
      {product && (
        <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 1000 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box component="img" src={product.thumbnail} alt={product.title} sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h4" component="h2" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Brand: {product.brand}
                </Typography>
                <Typography variant="body1" paragraph>
                  {product.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dimensions: Width {product.dimensions?.width || '-'}, Height {product.dimensions?.height || '-'}, Depth {product.dimensions?.depth || '-'}
                </Typography>
                <Typography variant="h5" color="primary" fontWeight="bold" mt={2}>
                  Rs. {product.price}
                </Typography>
                <Box mt={2}>
              <Button variant="contained" color="primary" size="large" onClick={addtocartItem}>
                Add to Cart
              </Button>
            </Box>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Return Policy: {product.returnPolicy || 'Not specified'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Shipping Information: {product.shippingInformation || 'Not specified'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default SingleProduct;
