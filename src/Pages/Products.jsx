import { CircularProgress, Typography, Container, Grid, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MultiActionAreaCard from '../components/Card';
import { useDispatch } from "react-redux";
import { addItem } from "../Config/redux/reducers/cartSlice.js";

const Product = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
      console.log(data.products);

    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  const navigate = useNavigate()


  const singleproduct = (product) => {
    navigate(`/singleproduct/${product.id}`)
    console.log("button press");

  }

  const dispatch = useDispatch()

  const addtocartItem = (product) => {
    console.log('product ===> ' , product);
    dispatch(addItem(product))
    
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      {error && (
        <Typography variant="h6" color="error" align="center" gutterBottom>
          Error fetching data. Please try again.
        </Typography>
      )}
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <CircularProgress size={60} />
        </Box>
      )}
      {!loading && !error && (
        <>
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
            ALL PRODUCTS
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {products && products.map((items) => (
              <Grid item xs={12} sm={6} md={4} key={items.id}>
                <MultiActionAreaCard
                  title={items.title}
                  description={items.description}
                  src={items.thumbnail}
                  price={items.price}
                  func={() => SingleProduct(items)}
                  addCart={()=> addtocartItem(items)}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Product;
