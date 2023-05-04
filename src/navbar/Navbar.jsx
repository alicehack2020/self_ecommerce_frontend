import { CalendarIcon, ChevronDownIcon, CloseIcon, HamburgerIcon, MoonIcon, SunIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, Card, Container, Flex, VStack,HStack, Heading, List, ListItem, MenuIcon, Spacer, Text, Wrap, useColorMode, Link } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'
  
import { updateCart } from '../redux/action/generalAction';
import { useDispatch, useSelector } from 'react-redux';
const NavBar = () => {
    const [selected, setSelected] = useState('Home')
    const { colorMode, toggleColorMode } = useColorMode();
    const [menu,setMenu]=useState(true)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    
     
    const themeChange = () => {
        toggleColorMode() 
    }

    const menuChange = () => {
        setMenu(false)
    }

    const changePage = (pagename) => {
        setSelected(pagename)
        navigate("/"+pagename)
  }
  

  const cartOpenClose = () => {
    dispatch(updateCart())
  }
     
   
  return (
      <Box mt={5} zIndex={2} bg={colorMode === 'light' ?'white' :'#1A202C'} padding={3} marginTop={0}  position={'fixed'} width={'100%'}>
          {
              menu === true ? <Flex justify={'space-between'} >
              
                  <Button rel="noreferrer" variant='ghost' isActive={selected === '/' ? true : false} onClick={() => changePage('')} display={{ base: 'none', md: 'flex', lg: 'flex' }}>Home</Button>
              
                      <HStack spacing='20px'>
                      <ButtonGroup variant='ghost' display={{ base: 'none', md: 'flex', lg: 'flex' }}>
                    
 
                              <Button isActive={selected === 'ProductListPage' ? true : false} onClick={() => changePage('ProductListPage')}>Products</Button>
                         
                              <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                  Profile
                                </MenuButton>
                                <MenuList>
                                  <MenuItem isActive={selected === 'login' ? true : false} onClick={() => changePage('login')}>Login</MenuItem>
                                  <MenuItem isActive={selected === 'register' ? true : false} onClick={() => changePage('register')}>Register</MenuItem>
                                  <MenuItem>Logout</MenuItem>
                                </MenuList>
                              </Menu>
                                    <Button isActive={selected === 'cart' ? true : false} onClick={() => cartOpenClose()}>cart</Button>
                            
                       </ButtonGroup>
            
                    <Flex justify={'space-between'} w={'100vw'} display={{ base: 'flex', md: 'none', lg: 'none' }}>
                      <Button leftIcon={<HamburgerIcon />} variant={'outline'} display={{ base: 'flex', md: 'none', lg: 'none' }} onClick={menuChange}></Button>
                          <HStack>
                            <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant={'ghost'}>
                                  Profile
                            </MenuButton>
                            <MenuList>
                            <MenuItem isActive={selected === 'login' ? true : false} onClick={() => changePage('login')}>Login</MenuItem>
                            <MenuItem isActive={selected === 'register' ? true : false} onClick={() => changePage('register')}>Register</MenuItem>
                            <MenuItem>Logout</MenuItem>
                            </MenuList>
                            </Menu>
                            <Button leftIcon={<CalendarIcon />} variant={'ghost'} display={{ base: 'flex', md: 'none', lg: 'none' }} onClick={()=>cartOpenClose()}>cart</Button>
                            <Button leftIcon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />} variant={'outline'} display={{ base: 'flex', md: 'none', lg: 'none' }} onClick={themeChange}>.</Button>
                            
                      </HStack>  
                      
                      </Flex>
                      <Button leftIcon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />} variant={'outline'} display={{ base: 'none', md: 'flex', lg: 'flex' }} onClick={themeChange}></Button>

          </HStack>
              </Flex> : <Container   bg={colorMode === 'light' ?'white' :'#1A202C'} display={{ base: 'flex', md: 'none', lg: 'none' }} justifyContent={'space-between'}>
                      
                      <VStack w={'80%'} variant='ghost'>
                      <Link href='#' w='100%'>
                              <Button w='100%' variant={'outline'} isActive={selected === '' ? true : false} onClick={() => changePage('')}>Home</Button>
                     </Link>
                       
                          <Link href='#Products' w='100%'>
                             <Button  w='100%' variant={'outline'}  href='#Products' isActive={selected === 'Products' ? true : false} onClick={() => changePage('ProductListPage')}>Products</Button>
                          </Link>
                          
                              <Link href='#contact' w='100%'>
                                  <Button w='100%' variant={'outline'}  isActive={selected === 'contact' ? true : false} onClick={() => changePage('contact')}>Contact</Button>
                              </Link>
                              <Link href='#About' w='100%'>
                            <Button  w='100%' variant={'outline'}  isActive={selected === 'About' ? true : false} onClick={() => changePage('About')}>About</Button>
                        </Link>  
                         
                      </VStack>
                      <Button variant={'ghost'} alignContent={'right'} leftIcon={<CloseIcon />} onClick={() => setMenu(true)}></Button>
              </Container>
          }
      </Box>
  )
}

export default NavBar