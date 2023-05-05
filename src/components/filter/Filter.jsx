import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Checkbox, HStack, Radio, RadioGroup, VStack } from '@chakra-ui/react'
import React from 'react'
import ReactStars from "react-rating-stars-component";

const Filter = () => {

    const ratingChanged = (newRating) => {
        console.log(newRating);
      };
  return (
      <Box w={'300px'}>
    
        
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
                      <VStack align={'left'}>
                            <Checkbox >100</Checkbox>
                            <Checkbox >200</Checkbox>
                            <Checkbox >300</Checkbox>
                            <Checkbox >400</Checkbox>
                      </VStack>
    
    </AccordionPanel>
  </AccordionItem>
</Accordion>
          
    
   <Accordion defaultIndex={[0]} allowMultiple w={'100%'} >
      <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
          Brand
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} >
        <VStack w={'100%'}  align={'left'}>
        <Checkbox>100</Checkbox>
        <Checkbox>200</Checkbox>
        <Checkbox>300</Checkbox>
        <Checkbox>400</Checkbox>  
        </VStack>
    </AccordionPanel>
  </AccordionItem>
</Accordion>
          
    
   <Accordion defaultIndex={[0]} allowMultiple w={'100%'}>
      <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
          Rating
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <ReactStars
    count={5}
    onChange={ratingChanged}
    size={24}
    activeColor="#ffd700"
  />
                      
    
    
   
    </AccordionPanel>
  </AccordionItem>
    </Accordion>

          
      </Box>
  )
}

export default Filter