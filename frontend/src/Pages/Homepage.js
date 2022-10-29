import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";

const Homepage = () => {

  const history = useHistory()

useEffect(()=>{
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))

  if(userInfo){
    history.push("/chats")
  }
},[history])

  return (
    <Container style={{opacity: 0.6}} maxW={"xl"} centerContent>
      <Box
        display="flex"
        justifyContent={"center"}
        p={"3"}
        w="100%"
        m={"40px 0 15p 0"}
        borderRadius="lg"
        bg={"white"}
        borderWidth={"1px"}
      >
        <Text fontSize={"4xl"} fontFamily={"Work sans"} color="black">
          {" "}
          login and signup
        </Text>
      </Box>
      <Box  bg={"white"}
      w={"100%"}
      p={"4"}
      borderRadius="lg"
      borderWidth={"1px"}
      color={"black"}
      >
      <Tabs variant='soft-rounded' >
  <TabList mb={"1em"} > 
    <Tab w={"50%"} >login</Tab>
    <Tab w={"50%"}>signup</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
  <Login/>
    </TabPanel>
    <TabPanel>
 <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
