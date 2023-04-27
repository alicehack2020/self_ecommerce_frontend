import React from 'react'
import TestimonialPage from './TestimonialPage'
import ProductPage from '../product/ProductPage'
import CaptionCarousel from './CaptionCarousel'
import { Box, HStack } from '@chakra-ui/react'

const LandingPage = () => {
  return (
    <Box >
      {/* <CaptionCarousel/> */} 
      <ProductPage/>
      <TestimonialPage/>
    </Box>
  )
}

export default LandingPage