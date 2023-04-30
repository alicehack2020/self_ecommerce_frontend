import React, { useEffect } from 'react'
import TestimonialPage from './TestimonialPage'
import ProductPage from '../product/ProductPage'
import CaptionCarousel from './CaptionCarousel'
import { Box, HStack } from '@chakra-ui/react'

const ProductListPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <Box >
      {/* <CaptionCarousel/> */} 
      <ProductPage/>
      <TestimonialPage/>
    </Box>
  )
}

export default ProductListPage