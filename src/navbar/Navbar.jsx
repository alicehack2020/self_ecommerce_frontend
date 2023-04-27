import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, Card, Container, Flex, VStack,HStack, Heading, List, ListItem, MenuIcon, Spacer, Text, Wrap, useColorMode, Link } from '@chakra-ui/react'
import React, { useState } from 'react'

const NavBar = () => {
    const [selected, setSelected] = useState('Home')
    const { colorMode, toggleColorMode } = useColorMode();
    const [menu,setMenu]=useState(true)
    

    const themeChange = () => {
        toggleColorMode() 
    }

    const menuChange = () => {
        setMenu(false)
    }
     
   
  return (
      <Box mt={5} zIndex={2} bg={colorMode === 'light' ?'white' :'#1A202C'} padding={3} marginTop={0}  position={'fixed'} width={'100%'}>
          {
              menu === true ? <Flex justify={'space-between'} >
              <Link href='#'>
                  <Button rel="noreferrer" variant='ghost' isActive={selected === 'Home' ? true : false} onClick={() => setSelected('Home')} display={{ base: 'none', md: 'flex', lg: 'flex' }}>Home</Button>
                </Link>
                      <HStack spacing='20px'>
                      <ButtonGroup variant='ghost' display={{ base: 'none', md: 'flex', lg: 'flex' }}>
                      <Link href='#About'>
                            <Button isActive={selected === 'About' ? true : false} onClick={() => setSelected('About')}>About</Button>
                     </Link>    
                           
                           
                          <Link href='#contact'>
                              <Button isActive={selected === 'contact' ? true : false} onClick={() => setSelected('contact')}>Contact</Button>
                          </Link>
                          

                          
                            <Button isActive={selected === 'cart' ? true : false} onClick={() => setSelected('cart')}>cart</Button>
                     
                                                     
                      
                       </ButtonGroup>
            
                    <Flex w={{ base: '600px', md: '600px', lg: '100%' }} alignItems={'center'}  >
                      <Button leftIcon={<HamburgerIcon />} variant={'outline'} display={{ base: 'flex', md: 'none', lg: 'none' }} onClick={menuChange} mr={2}></Button>
                      <Button leftIcon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />} onClick={themeChange} variant={'ghost'}></Button>
                      </Flex>
                     
          </HStack>
              </Flex> : <Container   bg={colorMode === 'light' ?'white' :'#1A202C'} display={{ base: 'flex', md: 'none', lg: 'none' }} justifyContent={'space-between'}>
                      
                      <VStack w={'80%'} variant='ghost'>
                      <Link href='#' w='100%'>
                              <Button w='100%' variant={'outline'} isActive={selected === 'Home' ? true : false} onClick={() => setSelected('Home')}>Home</Button>
                     </Link>
                      <Link href='#About' w='100%'>
                            <Button  w='100%' variant={'outline'}  isActive={selected === 'About' ? true : false} onClick={() => setSelected('About')}>About</Button>
                     </Link>    
                          <Link href='#Projects' w='100%'>
                             <Button  w='100%' variant={'outline'}  href='#Projects' isActive={selected === 'Projects' ? true : false} onClick={() => setSelected('Projects')}>Products</Button>
                          </Link>
                          
                              <Link href='#contact' w='100%'>
                              <Button w='100%' variant={'outline'}  isActive={selected === 'contact' ? true : false} onClick={() => setSelected('contact')}>Contact</Button>
                          </Link>
                          
                         
                      </VStack>
                      <Button variant={'ghost'} alignContent={'right'} leftIcon={<CloseIcon />} onClick={() => setMenu(true)}></Button>
              </Container>
          }
      </Box>
  )
}

export default NavBar