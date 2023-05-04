import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Heading, Text, VStack, useDisclosure } from '@chakra-ui/react'
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
import { errorsMessage, successMessage } from '../helpers/helper'
 

const Checkout = () => {
  const cartOpen = useSelector((state) => state.generalReducer)
  const bascketData = useSelector((state) => state.getBascketData)
  const { onOpen, onClose } = useDisclosure()
  
   

  const dispatch = useDispatch() 
  useEffect(() => {
    dispatch(getCart())
    dispatch(getBascket())
  },[])


  useEffect(() => {
    dispatch(getBascket())
  }, [])
  

  const cartOpenClose = () => {
    onClose()
    dispatch(updateCart())
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

	const handlePayment = async (checkoutId) => {
		try {
			const orderUrl = `${backend_url}/api/payment/orders`;
			const { data } = await axios.post(orderUrl, { checkoutId: checkoutId });
			console.log(data);
		  initPayment(data.data);
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
            bascketData?.data?.map((e) => {
            return <CheckoutProduct title={e?.brandName} price={e?.listPrice} IMAGE={e?.heroImage} category={e?.displayName} id={e?._id} />
          })
        } 

         
             
       </SimpleGrid>
          </DrawerBody>
          <DrawerFooter borderTopWidth='1px'>
            <Flex>
            <Button variant='outline' mr={3} onClick={cartOpenClose}>
              Cancel
            </Button>
              
              {
                bascketData?.Total !== 0 ?
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
    </>
  )
}

export default Checkout