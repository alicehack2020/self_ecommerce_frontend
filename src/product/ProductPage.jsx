import { Box, Button, Checkbox, Flex, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ProductSimple from './ProductSimple'
import axios from "axios"
import { Select } from '@chakra-ui/react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import Filter from '../filter/Filter'
// import { data } from '../data'
import {url} from "../constants/Constants"
import CheckoutProduct from './CheckoutProduct'
const ProductPage = () => {
  
  const [data, setData] = useState([])
  
  const [size, setSize] = React.useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()


  useEffect(() => {
    loadData()
  },[])
 



  const loadData = async() => {
    axios.get(`${url}/api/product/listProducts`).then((res) => {
      setData(res.data.list)
    })
  }

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full']

  const handleClick = (newSize) => {
    setSize(newSize)
    onOpen()
  }

  return (
    <Box w={'100%'}>
     
    <Flex >
    <Box  w={'300px'} display={{ base: 'none', md: 'flex', lg: 'flex' }} mt={20}  h={'auto'} p={4}   >
          <Filter />
          <Button onClick={handleClick}>cart</Button>
    </Box>
        
        <Box w={'100%'} pt={20} alignSelf={'flex-end'}>
        <Flex w={'100%'} justifyContent={'flex-end'} >
        <Box p={2} mr={5}>
            <Select placeholder='Select option'>
            <option value='option1'>Price</option>
            <option value='option2'>Brand</option>
            <option value='option3'>Name</option>
            </Select>
         </Box>
      </Flex>
        <SimpleGrid minChildWidth={'250px'} gap={'20px'}>
        {
          data?.map((e) => {
            return <ProductSimple title={e?.brandName} price={e?.listPrice} IMAGE={e?.heroImage} category={e?.displayName} id={e?._id} />
          })
        }    
             
       </SimpleGrid>
      </Box>
      </Flex>
      
      <Drawer onClose={onClose} isOpen={isOpen} size={sizes[2]}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Checkout</DrawerHeader>
          <DrawerBody>
          <SimpleGrid minChildWidth={'250px'} gap={'20px'}>
        
          {
          data?.map((e) => {
            return <CheckoutProduct title={e?.brandName} price={e?.listPrice} IMAGE={e?.heroImage} category={e?.displayName} id={e?._id} />
          })
        } 

         
             
       </SimpleGrid>
          </DrawerBody>
          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>

    
     
  )
}

export default ProductPage