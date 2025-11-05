import React, { useEffect } from 'react'
import { useApiHandler } from '../../services/apiHandler';
import { Box, Button, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/loader';

const Home = () => {
  const { callApi, loading } = useApiHandler();
  const navigate = useNavigate()
  const fetchData = () => {
    callApi({
      method: "get",
      url: "/course/all",
      successMsg: "Test data fetched successfully!",

      onSuccess: (res) => {
        console.log("API Success Response:", res);
      },
      onError: (err) => {
        console.error("API Error:", err);
      },
    });
  };
  console.log('loading',loading)
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      {/* <Loader open={loading}/> */}
      <h1 style={{ marginBottom: '30px' }}>Welcome Home</h1>
      <Box sx={{display:'flex', gap:'10px'}}>
        <Button variant="contained" color="success" onClick={() => navigate('/form')}>Forms Input</Button>
        <Button variant="contained" color="primary" onClick={() => navigate('/login')}>Login</Button>
      </Box>
    </Container>
  )
}

export default Home