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
import Filter from '../filter/Filter'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getProduct } from '../redux/action/productAction'
import Checkout from '../checkout/Checkout'

const ProductPage = () => {
  
  const [data, setData] = useState([])
  const dispatch = useDispatch() 

  const latestData = useSelector((state) => state.getProductData)
  

  useEffect(() => {
    dispatch(getProduct())
  }, [])

  useEffect(() => {
    setData(latestData?.list)
  },[latestData])
 




  return (
    <Box w={'100%'}>
     
    <Flex >
    <Box  w={'300px'} display={{ base: 'none', md: 'flex', lg: 'flex' }} mt={20}  h={'auto'} p={4}   >
          <Filter />
           
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
      <Checkout/>
      
    
    </Box>

    
     
  )
}

export default ProductPage