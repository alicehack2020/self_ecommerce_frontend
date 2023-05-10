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
import { useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backend_url } from '../constants/Constants';
import { errorsMessage, successMessage } from '../helpers/helper';
import MyInput from '../components/MyInput';
import Loading from '../components/Loading';
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading,setIsLoading]=useState(false)
   const navigate=useNavigate()
      const [userInfo, setUserInfo] = useState({
        fname:'',
        lname:'',
        mobile:'',
        email:'',
        password:''
      })  
    
  const handleFormData = (e) => {
    let { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }


  const registerUser = async () => {
     setIsLoading(true)
      await axios.post(`${backend_url}/auth/register`, {
        userInfo
      }).then((res) => {
        if (res.data.status === 'failed') {
          errorsMessage(res.data.message)
          setIsLoading(false)
        }
        else {
          successMessage(res.data.message)
          setUserInfo({
          fname: '',
          lname:'',
          mobile:'',
          email:'',
            password: ''
          })
          setIsLoading(false)
        }
        
       
      }).catch((error) => {
        errorsMessage(error?.data?.message)
        setIsLoading(false)
      })
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

      if (!userInfo.mobile || (userInfo.mobile.length < 0 || userInfo.mobile.length > 10))
      {
        errorsMessage("Please enter valid mobile number")
        return;
      }


      registerUser();
       
    };
    
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
    
    return (
      <Flex
        pt={10}
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
          {/* <Loading isLoading={isLoading} /> */}
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
                <MyInput
                  id={"firstName"}
                  name={"fname"}
                  label="First Name"
                  type={"text"}
                  value={userInfo.fname}
                  onChange={handleFormData}
                />
                <MyInput
                  id={"lastName"}
                  name={"lname"}
                  label="Last Name"
                  type={"text"}
                  value={userInfo.lname}
                  onChange={handleFormData}
                />
              </HStack>
              <MyInput
                id={"email"}
                name={"email"}
                label="Email address"
                type={"email"}
                value={userInfo.email}
                onChange={handleFormData}
              />
              <MyInput
                id={"mobile"}
                name={"mobile"}
                label="Enter Mobile"
                type={"number"}
                value={userInfo.mobile}
                onChange={handleFormData}
              />
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={userInfo.password}
                    name={"password"}
                    onChange={handleFormData} />
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
                  onClick={handleSubmit}
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
                  Already a user? <Link color={'blue.400'} onClick={() => navigate("/login")}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
       
      </Flex>
    );
  }