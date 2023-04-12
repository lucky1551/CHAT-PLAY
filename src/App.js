import {Box,Button,Container,HStack,Input,VStack} from '@chakra-ui/react'
import Message from './Component/Message';
import {getAuth,GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth"
import {app} from "./firebase"
import { useEffect, useState } from 'react';

import {getFirestore,addDoc} from "firebase/firestore";






const auth = getAuth(app);
const db = getFirestore(app);

function App() {
  const loginHandler = ()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }
  const logoutHandler =()=>{
        signOut(auth);
  }
  const [user,userSet] = useState(false);
   useEffect(()=>{
   const unsubscribe = onAuthStateChanged(auth, (data)=>{userSet(data); console.log(data)})
   return ()=>{
    unsubscribe();
   }
   })
  return (
    <Box >
     {user?( <Container h={"100vh"} bg={"purple.100"}>
        <VStack h = {"full"} >
          <Button colorScheme='red' w='full' onClick={logoutHandler}>Logout</Button>
          <VStack h={"full"} w={"full"}overflowY={"auto"} >
          <Message text={"hi everyone"} user='me'/>
          <Message text={"hi everyone"} /> <Message text={"hi everyone"} user='me'/>
          </VStack>
        
        </VStack>
        <form style={{width:"100%"}}> <HStack><Input placeholder={'Message'} /> <Button type='submit' colorScheme={"purple"}>Send</Button> </HStack> </form>
      </Container>):<VStack justifyContent={"center"} h={"100vh"}><Button bg={"purple.400"} colorScheme='purple' onClick={loginHandler}>Sign In with Google</Button></VStack>} 
    </Box>
  );
}

export default App;
