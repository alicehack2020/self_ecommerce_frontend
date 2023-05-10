import React, { useEffect } from 'react'
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Box, Image, SimpleGrid} from "@chakra-ui/react"
import PostWithImage from './PostWithImage';
import { landingImages } from '../data';
import useReactIpLocation from "react-ip-details";
const LandingPage = () => {

  var {ipResponse} = useReactIpLocation();
  localStorage.setItem("ip", ipResponse?.IPv4)
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Box pt={20} mb={10} w={'100%'}>
      <Box  mx={10}>
      <Slider {...settings}>
      <Box>
       <Image src="https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F27024021-0638-4225-b6df-c7f48942bdf4.jpg&w=1920&q=75"></Image>
      </Box>
      <Box>
       <Image src="https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2F9723d8e3-9e99-459f-acfe-4ef93089e9ef.jpg&w=1920&q=75"></Image>
      </Box>
      <Box>
       <Image src="https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Fcd9aec57-0010-49f2-a903-47b581127743.gif&w=1920&q=75"></Image>
      </Box>
      <Box>
       <Image src="https://in.sugarcosmetics.com/_next/image?url=https%3A%2F%2Fd32baadbbpueqt.cloudfront.net%2FHomepage%2Fc1c0fae0-f339-4378-b29f-e95b8c474e55.jpg&w=1920&q=75"></Image>
      </Box>
      </Slider>
 
      </Box>
      <Box mt={5} mx={10}  alignItems={'center'} >
      <SimpleGrid minChildWidth={'300px'} spacing={2}>
          {
            landingImages.map((e) => {
              return <PostWithImage image={e.heroImage} />
            })
        } 
     </SimpleGrid> 
      </Box>
      
    </Box>
  )
}

export default LandingPage