import { Box, Checkbox, Flex, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react'
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
const ProductPage = () => {
  
  const [data,setData]=useState([])
  const [size, setSize] = React.useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()


  useEffect(() => {
    loadData()
  },[])
 



  const loadData = async() => {
    axios.get("https://shaphorabackend.onrender.com/gifts").then((res) => {
      setData(res.data)
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
        <Box  w={'300px'} display={{ base: 'none', md: 'flex', lg: 'flex' }} mt={20} w={'20%'}  h={'auto'} p={4}   >
      <Accordion defaultIndex={[0]} allowMultiple w={'100%'}>
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
          data.map((e) => {
            return <ProductSimple title={e.brandName} price={e.currentSku.listPrice} IMAGE={e.heroImage} category={e.displayName} id={e.productId} />
          })
        }    
             
       </SimpleGrid>
      </Box>
      </Flex>
      
      <Drawer onClose={onClose} isOpen={isOpen} size={size}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{`${size} drawer contents`}</DrawerHeader>
          <DrawerBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              
            </p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>

    
     
  )
}

export default ProductPage