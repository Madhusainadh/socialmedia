import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ChatState } from '../context/ChatProvider.js'
import { Box } from '@chakra-ui/react'
import SideDrawer from '../components/miscellaneous/SideDrawer.js'
import MyChats from '../components/MyChats.js'
import Chatbox from '../components/ChatBox.js'
// import MyChats from '../components/miscellaneous/MyChats.js'
// import ChatBox from '../components/miscellaneous/ChatBox.js'

export const ChatPage = () => {


 const {user}= ChatState()

 const [fetchAgain,setFetchAgain] = useState(false)
  return (
    <Box w={"100%"}>
    {/* {user && <SideDrawer/>} */}
 
    {user && <SideDrawer/>}

    <Box display="flex"
    justifyContent={"space-between"}
    w="100%"
    h={"91.5vh"}
    p="10px"
    >
    {user&&<MyChats fetchAgain={fetchAgain} />}
    {user&&<Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
    </Box>
   
 {/*} {user&&<MyChats/>}*/}
 {/*} {user&&<ChatBox/>}*/}
 
    </Box>
  )
}
