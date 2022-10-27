import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [show, setshow] = useState(false);
  const toast = useToast();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // console.log(email, password);
    try {
    

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
     
      );

      // console.log(JSON.stringify(data));
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <Box>
      <VStack spacing={"5px"}>
        <FormControl id="email" isRequired>
          <FormLabel>email</FormLabel>
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          ></Input>
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>password</FormLabel>
          <InputGroup>
            <Input
              type={!show ? "password" : "text"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            ></Input>
            <InputRightElement w={"4.5rem"}>
              <Button h={"1.75rem"} size="sm" onClick={() => setshow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          color="white"
          colorScheme={"blue"}
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
        >
          Login
        </Button>
        <Button
          isLoading={loading}
          variant={"solid"}
          colorScheme={"red"}
          width="100%"
          style={{ marginTop: 15 }}
          onClick={() => {
            setemail("guset@example.com");
            setpassword("12345678");
          }}
        >
          Guest Login
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
