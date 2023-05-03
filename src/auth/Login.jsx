import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Toast,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { backend_url } from '../constants/Constants';
export default function Login() {
  const toast = useToast()
  const navigate=useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const [userInfo, setUserInfo] = useState({
    email:'',
    password:''
  }) 
  
  const loginUser =async () => {
    await axios.post(`${backend_url}/auth/login`,{email:userInfo.email,password:userInfo.password}).then((res) => {
      console.log(res.data)
      let status='success'
      if (res.data.status === 'failed')
      {
        status="error"
      }

      toast({
        title:res.data.message,
        // description: "We've created your account for you.",
        status: status,
        duration: 3000,
        isClosable: true,
      })
    }).catch((error) => {
      toast({
        title:error.data.message,
        // description: "We've created your account for you.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      })
}
  return (
    <Flex
      pt={5}
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
          Welcome to DMart ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={userInfo.password} onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}/>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                onClick={loginUser}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
              <Stack pt={2}>
                <Text align={'center'}>
                  New User? <Link color={'blue.400'} onClick={()=>navigate("/register")}>Register</Link>
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}