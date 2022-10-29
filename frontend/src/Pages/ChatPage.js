import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ChatState } from '../context/ChatProvider.js'
import { Box } from '@chakra-ui/react'
import SideDrawer from '../components/miscellaneous/SideDrawer.js'
import MyChats from '../components/miscellaneous/MyChats.js'
import ChatBox from '../components/miscellaneous/ChatBox.js'

export const ChatPage = () => {


 const {user}= ChatState()

  return (
    <Box w={"100%"}>
    {/* {user && <SideDrawer/>} */}
 
    {user && <SideDrawer/>}
    {user&&<MyChats/>}
 {/*} {user&&<MyChats/>}*/}
 {/*} {user&&<ChatBox/>}*/}
 
    </Box>
  )
}
