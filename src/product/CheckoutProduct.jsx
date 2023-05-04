import { Box, Button, HStack, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { DeleteIcon } from "@chakra-ui/icons"
import { removeBascket } from '../redux/action/cartAction'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const CheckoutProduct = ({ title, IMAGE, category, price, id }) => {
  const dispatch = useDispatch() 
  const removeBascketData = (id) => {
    dispatch(removeBascket(id))
  }

 
  return (
      <HStack justifyContent={'space-between'} shadow={'md'} p={2}>
          <VStack>
              <Text>{title}</Text>  
              <Image src={IMAGE} w={'100px'}></Image>
          </VStack>
          <HStack>
            
            <Text>₹{price}</Text>
          </HStack>
             
          <Button leftIcon={<DeleteIcon/>} onClick={()=>removeBascketData(id)}></Button>   
    </HStack>
  )
}

export default CheckoutProduct