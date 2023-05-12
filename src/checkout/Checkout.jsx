import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Checkbox, Container, Flex, FormControl, FormLabel, HStack, Heading, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  SimpleGrid,
} from '@chakra-ui/react'
import CheckoutProduct from '../product/CheckoutProduct'

import { getCart } from '../redux/action/generalAction'
import { updateCart } from '../redux/action/generalAction'

import { getBascket } from '../redux/action/cartAction'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import {backend_url} from "../constants/Constants"
import axios from 'axios'
import { errorsMessage, setToken, successMessage } from '../helpers/helper'
import { Link } from 'react-router-dom'
import MyInput from '../components/MyInput'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { PinInput, PinInputField } from '@chakra-ui/react'
 const Checkout = () => {
  const cartOpen = useSelector((state) => state.generalReducer)
  const bascketData = useSelector((state) => state.getBascketData)
  const { isOpen,onOpen, onClose } = useDisclosure()  
   const [login, setLogin] = useState(true)
   const [optscreen,setOptScreen]=useState(false)
   let ip = localStorage.getItem("ip")
   const [completeModal,setCompleteModal]=useState(true)
   const [pin, setPin] = useState('');
   const handlePinChange = (value) => {
    setPin(value);
  };
   const [userInfoLogin, setUserInfoLogin] = useState({
    email:'',
    password:''
   }) 

   const [InfoForPayment, setInfoForPayment] = useState({
    mobile:'',
    email:'',
    fname:''
   })

   const [userInfo, setUserInfo] = useState({
    fname:'',
    lname:'',
    mobile:'',
    email:'',
    password:''
  })  
   const [showPassword, setShowPassword] = useState(false);

   const handleFormDataLogin = (e) => {
    let { name, value } = e.target;
    setUserInfoLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
   }

   const handleFormData = (e) => {
    let { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
   }

   const dispatch = useDispatch()
   
  useEffect(() => {
    dispatch(getCart())
    dispatch(getBascket())
  }, [])
  const cartOpenClose = () => {
    onClose()
    dispatch(updateCart())
   }
   
   const loginUser = async () => {
    localStorage.setItem("email",userInfoLogin.email)
     await axios.post(`${backend_url}/auth/loginInCheckOut`,
       {
         email: userInfoLogin.email,
         password: userInfoLogin.password,
         ip
       })
       .then((res) =>
       { 
        if (res.data.status === 'failed')
        {
          errorsMessage(res.data.message)
        }
        else {
          if (res.data.verified) {
            setToken(res.data.token, res.data.id)
            localStorage.setItem("token", res.data.token)
            setInfoForPayment({
              mobile:res.data.mobile,
              email:res.data.email,
              fname:res.data.fname
            })
            successMessage(res.data.message)
            let checkoutIds=localStorage.getItem("checkoutId")
            handlePayment(checkoutIds)
          }
          else {
            successMessage(res.data.message)
            setOptScreen(true)
          }
        }
    }).catch((error) => {
      errorsMessage(error.data.message)
      })
   }
   const RegisterUser = () => {
     
   }

   const VerifyEmail = async () => {
     const email=localStorage.getItem("email")
     const ip=localStorage.getItem("ip")
     await axios.post(`${backend_url}/auth/VerifyEmailInCheckOut`,{email:email,pin:pin,ip:ip})
       .then((data) => {
        console.log(data)
         successMessage(data.data.message)
         setOptScreen(false)
         setCompleteModal(false)
         localStorage.setItem("id",data.data.data.userID)
         setInfoForPayment({
            mobile:data.data.data.mobile,
            email:data.data.data.email,
            fname:data.data.data.fname 
         })
         let checkoutIds=localStorage.getItem("checkoutId")
         handlePayment(checkoutIds)
       }).catch((error) => {
        console.log(error)
       errorsMessage(error.response.data.message)
    })
   }


  const initPayment = (data) => {
      const options = {
        key: process.env.YOUR_RAZORPAY_KEY,
        amount: data.amount,
        currency: data.currency,
        name: "d-mart shopping",
        description: "This demo website of ecommerce educational use only",
        image: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
        order_id: data.id,
        prefill: {
          name: InfoForPayment.fname,
          email: InfoForPayment.email,
          contact: InfoForPayment.mobile,
        },
        handler: async (response) => {
          try {
            let id=localStorage.getItem("id")
            const verifyUrl = `${backend_url}/api/payment/verify`;
            const { data } = await axios.post(verifyUrl, { ...response, id: id });
            // console.log(data);
            successMessage(data.message)
            dispatch(getBascket())
          } catch (error) {
            console.log(error);
            errorsMessage(error.response.data.message)
          }
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
	};

   const handlePayment = async (checkoutIds) => {
    localStorage.setItem("checkoutId",checkoutIds)
    try {
      const token=localStorage.getItem("token")
      if (token===undefined || token===null)
      {
        localStorage.setItem("checkoutId",checkoutIds)
        onOpen()
        setCompleteModal(true)
      }
      else {
        
        const checkoutId=localStorage.getItem("checkoutId")
        const orderUrl = `${backend_url}/api/payment/orders`;
        const { data } = await axios.post(orderUrl, { checkoutId: checkoutId });
        console.log(data);
        initPayment(data.data); 

      }
			
		} catch (error) {
			console.log(error);
		}
	};
  
  return (
    <>
      <Drawer onClose={cartOpenClose} isOpen={cartOpen?.isCartOpen} size={'md'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Products</DrawerHeader>
          <DrawerBody>
          <SimpleGrid minChildWidth={'250px'} gap={'20px'}>
        
          {
            bascketData?.data?.map((e,index) => {
              return <CheckoutProduct key={index} title={e?.brandName} price={e?.listPrice} IMAGE={e?.heroImage} category={e?.displayName} id={e?._id} />
          })
        }   
       </SimpleGrid>
          </DrawerBody>
          <DrawerFooter borderTopWidth='1px'>
            <Flex>
            <Button variant='outline' mr={3} onClick={cartOpenClose}>
              Cancel
              </Button>
              {/* <Button onClick={onOpen}>Open Modal</Button> */}
              
              {
                bascketData?.data?.length>0?
                  <Box>
                  <Button colorScheme='blue' onClick={()=>handlePayment(bascketData?.checkoutId)}>PAY</Button>
                  <VStack>
                    <Heading>₹{bascketData?.Total}</Heading>
                    <Text>{bascketData?.ItemCount}Items</Text>
                  </VStack>
                </Box> : <Box mt={1}>
                    Please add products
              </Box>
              }
             
            </Flex>
            
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <>
        {
          completeModal == true ? <>
          <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            {
              optscreen==false?<ModalHeader>Login/Register</ModalHeader>:<ModalHeader>Enter OTP</ModalHeader>
            }
            <ModalCloseButton />
            { 
              optscreen==false?<ModalBody>
              {login === true ?<> 
              <Stack spacing={4}>
                <MyInput
                      id={"email"}
                      name={"email"}
                      label="Email address"
                      type={"email"}
                      value={userInfoLogin.fname}
                      onChange={handleFormDataLogin}
                />
                <MyInput
                      id={"password"}
                      name={"password"}
                      label="Password"
                      type={"email"}
                      value={userInfoLogin.password}
                      onChange={handleFormDataLogin}
                    />
                <Stack spacing={10}>
                    <Button
                    onClick={loginUser}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Sign in
                    </Button>
                    <Text align={'center'}>
                      New User? <Link color={'blue.400'} onClick={()=>setLogin(!login)}>Register</Link>
                    </Text>
                </Stack>
              </Stack>
            </> 
          :<>
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
                  onClick={RegisterUser}        
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
                  Already a user? <Link color={'blue.400'} onClick={() => setLogin(!login)}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </>}
              </ModalBody> : <>
                  <ModalBody>
                    <Center w={'100%'}>
                      <VStack>
                      <HStack>
                      <PinInput type='alphanumeric' onChange={handlePinChange}>
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      </PinInput>
                        </HStack>
                        <HStack>
                          <Button onClick={()=>setOptScreen(false)}>back</Button>
                          <Button onClick={VerifyEmail}>verify</Button>
                        </HStack>
                      
                     </VStack> 
                    </Center>   
                 </ModalBody> 
            </>
          }
            <ModalFooter>
            </ModalFooter>
          </ModalContent>
        </Modal>
          </>:<></>
        }
      </>
    </>
  )
}

export default Checkout