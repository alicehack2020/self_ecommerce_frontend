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
  import { errorsMessage, setToken, successMessage } from '../helpers/helper';
  import MyInput from "../components/MyInput"
import Loading from '../components/Loading';
  export default function SendEmailForVerification() {
    const [isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
    const [userInfo, setUserInfo] = useState({
      email:'',
    }) 
    const handleFormData = (e) => {
      let { name, value } = e.target;
      setUserInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      for (const field in userInfo) {
        if (typeof userInfo[field] === "string" && userInfo[field].trim() === "") {
          errorsMessage(`Please enter a ${field}`)
          return;
        }
      }
    
      if (!validateEmail(userInfo.email)) {
        errorsMessage("Please enter a valid email address")
        return;
      }
      loginUser();
       
    };
    const loginUser = async () => {
      setIsLoading(true)
      await axios.post(`${backend_url}/auth/sendEmail`,{email:userInfo.email}).then((res) => {
        setToken(res.data.token,res.data.id)
        if (res.data.status === 'failed')
        {
          errorsMessage(res.data.message)
          setIsLoading(false)
        }
        else {
          successMessage(res.data.message)
          setIsLoading(false)
        }
      }).catch((error) => {
        errorsMessage(error.data.message)
        setIsLoading(false)
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
            <Heading fontSize={'4xl'}>Verify Email</Heading>
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
              <MyInput
                    id={"email"}
                    name={"email"}
                    label="Email address"
                    type={"email"}
                    value={userInfo.fname}
                    onChange={handleFormData}
              />
              
                
              <Button
                 disabled={isLoading}
                  onClick={handleSubmit}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Submit
              </Button>
              {/* <Loading isLoading={isLoading} /> */}
              </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }