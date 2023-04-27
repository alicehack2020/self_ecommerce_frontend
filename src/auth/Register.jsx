import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from '../constants/Constants';
  
  export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
   const navigate=useNavigate()
      const [userInfo, setUserInfo] = useState({
        fname:'',
        lname:'',
        email:'',
        password:''
    })  
    const toast = useToast() 
    const registerUser =async () => {
      await axios.post(`${url}/auth/register`, {
        email: userInfo.email,
        password: userInfo.password,
        fname: userInfo.fname,
        lname: userInfo.lname
      }).then((res) => {
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
        console.log(error)
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
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
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
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                        <Input required type="text" value={userInfo.fname} onChange={(e) => setUserInfo({ ...userInfo, fname: e.target.value })}/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input  type="text" value={userInfo.lname} onChange={(e) => setUserInfo({ ...userInfo, lname: e.target.value })}/>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input required type="email" value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}/>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input required type={showPassword ? 'text' : 'password'} value={userInfo.password} onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}/>
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                onClick={registerUser}
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                  
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'} onClick={()=>navigate("/login")}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }