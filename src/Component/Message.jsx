import React from 'react'

import {HStack,Avatar, Text} from '@chakra-ui/react'

const Message = ({text, img, user="other"}) => {
  return (
    <HStack alignSelf={user==="me"? "flex-end": 'flex-start' } bg={"white"} paddingX={4} paddingY={2} borderRadius={"base"} >
        {(user === "other") && <Avatar src={img}/>}
        <Text>{text}</Text>
        {(user === "me") && <Avatar src={img}/>}
        
    </HStack>
  )
}

export default Message