import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { postBascket } from '../redux/action/cartAction'

export default function ProductSimple({ title, IMAGE, category, price,id,ip})
{

  const navigate = useNavigate()
  const dispatch = useDispatch() 
  const productData = () => {
    navigate(`/ProductDetails/${id}`)
  }

  const addBascket = (id,ip) => {
    dispatch(postBascket(id,ip))
  }
  return (
    <Center py={12}>
      <Box
        
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
           
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            bg: 'yello',
            backgroundImage: `url(${IMAGE})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            cursor={'pointer'}
            onClick={()=>productData()}
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'fill'}
            src={IMAGE}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            {category}
          </Text>
          <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={500}>
            {title}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
            ₹{price}
            </Text>
            <Text textDecoration={'line-through'} color={'gray.600'}>
            ₹{price*2}
            </Text>
          </Stack>
          <Stack direction={'row'} align={'center'}>
             <Button onClick={()=>addBascket(id,ip)}>BUY</Button> 
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}