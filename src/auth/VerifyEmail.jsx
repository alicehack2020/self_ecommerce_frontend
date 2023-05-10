import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Flex, Heading, Text, VStack, useDisclosure } from '@chakra-ui/react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { backend_url } from '../constants/Constants'
import { errorsMessage, successMessage } from '../helpers/helper'
import { Audio, Triangle } from  'react-loader-spinner'
import Loading from '../components/Loading'

const VerifyEmail = () => {
    const { token } = useParams()
    const navigate=useNavigate()
    const [isLoading,setIsLoading]=useState(true)
    useEffect(() => {
        loadData()
    }, [token])
  
    const loadData = async () => {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const response = await axios.get(`${backend_url}/auth/verifyEmail`, config);
          console.log(response.data);
          successMessage(response.data.message)
          setTimeout(() => {
            setIsLoading(false)
            navigate("/login")
          },1000)
        } catch (error) {
          errorsMessage(error.data.message)
          console.log(error);
          setTimeout(() => {
            setIsLoading(false)
            navigate("/login")
          },1000)
        }
      };
      
 
  return (
      <Center  py={150} px={50}>
      <Text>we are verifing your email please wait.....</Text>
      <Loading isLoading={isLoading}/>
    </Center>
  )
}

export default VerifyEmail