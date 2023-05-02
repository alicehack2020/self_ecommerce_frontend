import { Box, Button, HStack, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { DeleteIcon } from "@chakra-ui/icons"
const CheckoutProduct = ({ title, IMAGE, category, price,id }) => {
  return (
      <HStack justifyContent={'space-between'} shadow={'md'} p={2}>
          <VStack>
              <Text>{title}</Text>  
              <Image src={IMAGE} w={'100px'}></Image>
          </VStack>
          <HStack>
            
            <Text>₹{price}</Text>
          </HStack>
             
          <Button leftIcon={<DeleteIcon/>}></Button>   
    </HStack>
  )
}

export default CheckoutProduct