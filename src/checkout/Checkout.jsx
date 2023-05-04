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

 

const Checkout = () => {
  const cartOpen = useSelector((state) => state.generalReducer)
  const bascketData = useSelector((state) => state.getBascketData)
  const { onOpen,onClose } = useDisclosure()
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
                  <Button colorScheme='blue'>PAY</Button>
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