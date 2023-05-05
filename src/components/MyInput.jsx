import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

const MyInput = ({name,id,label,type,value,onChange}) => {
  return (
    <Box>
        <FormControl id={id} isRequired>
         <FormLabel>{label}</FormLabel>
        <Input
            required
            type={type}
            name={name}
            value={value}
            onChange={onChange} />
        </FormControl>  
    </Box>
  )
}

export default MyInput