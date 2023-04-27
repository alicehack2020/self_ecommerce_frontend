import { Box, Checkbox, Flex, SimpleGrid, Text } from '@chakra-ui/react'
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
const ProductPage = () => {
  
  const [data,setData]=useState([])


  useEffect(() => {
    loadData()
  },[])
 



  const loadData = async() => {
    axios.get("https://shaphorabackend.onrender.com/gifts").then((res) => {
      setData(res.data)
    })
  }


  return (
    <Box w={'100%'}>
      <Flex w={'100%'} justifyContent={'flex-end'} >
        <Box p={2} >
            <Select placeholder='Select option'>
            <option value='option1'>Price</option>
            <option value='option2'>Brand</option>
            <option value='option3'>Name</option>
            </Select>
         </Box>
      </Flex>
    <Flex w={'100vw'}>
      <Box   mt={20} w={'20%'}  h={'auto'} p={4}   >
      <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
          Price
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <Checkbox defaultChecked>Checkbox</Checkbox>
    </AccordionPanel>
  </AccordionItem>
      </Accordion>
        </Box>
        
       <Box  w={'100%'} pt={20} alignSelf={'flex-end'}>
        <SimpleGrid minChildWidth={'300px'} gap={'20px'}>
        {
          data.map((e) => {
            return <ProductSimple title={e.brandName} price={e.currentSku.listPrice} IMAGE={e.heroImage} category={e.displayName} id={e.productId} />
          })
        }    
             
       </SimpleGrid>
      </Box>
    </Flex>
    </Box>
    
     
  )
}

export default ProductPage