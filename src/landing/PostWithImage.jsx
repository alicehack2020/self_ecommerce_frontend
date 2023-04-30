import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function PostWithImage({ image }) {
  const navigate=useNavigate()
  return (
    <Box mt={5}>
       
      <Image src={image} h={'250px'}
        onClick={() => navigate("/ProductListPage")}
        cursor={'pointer'}></Image>
    </Box>
  );
}