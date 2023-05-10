import { Box,Flex, SimpleGrid} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ProductSimple from './ProductSimple'
import { Select } from '@chakra-ui/react'
import Filter from '../components/filter/Filter'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getProduct } from '../redux/action/productAction'
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
        {data?.length === 0 && <h1>Loading...</h1>}
        <SimpleGrid minChildWidth={'250px'} gap={'20px'}>
        {
          data?.map((e,index) => {
            return <ProductSimple key={index} title={e?.brandName} price={e?.listPrice} IMAGE={e?.heroImage} category={e?.displayName} id={e?._id} />
          })
        }    
             
       </SimpleGrid>
      </Box>
      </Flex>
      
    </Box>

    
     
  )
}

export default ProductPage