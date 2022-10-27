import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Toast,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [pic, setPic] = useState("");
  const [show, setShow] = useState(false);
  const [Loading, setLoading] = useState(false);
  // const postDetails=(pics)=>{
  // https://api.cloudinary.com/v1_1/dno0fycam/image/upload
  // }
  const toast = useToast();
  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "socialmedia");
      data.append("cloud_name", "dno0fycam");
      fetch("https://api.cloudinary.com/v1_1/dno0fycam/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
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
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      // const config = {
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      // };
      const { data } = await axios.post("http://localhost:5000/api/user", {
        name: name,
        email: email,
        password: password,
        pic: pic,
      });

      console.log(data);
      toast({
        title: "Registration Successful",
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

  // const submitHandler=async()=>{
  //   setLoading(true);
  //     if (!name || !email || !password || !Confirmpassword) {
  //       toast({
  //         title: "Please Fill all the Feilds",
  //         status: "warning",
  //         duration: 5000,
  //         isClosable: true,
  //         position: "bottom",
  //       });
  //       setLoading(false);
  //       return;
  //     }
  //     if (password !== Confirmpassword) {
  //       toast({
  //         title: "Passwords Do Not Match",
  //         status: "warning",
  //         duration: 5000,
  //         isClosable: true,
  //         position: "bottom",
  //       });
  //       return;
  //     }
  //     console.log(name, email, password, pic);
  //     try {
  //       const config = {
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //       };
  //       const { data } = await axios.post(
  //         "/api/user",
  //         {
  //           name,
  //           email,
  //           password,
  //           pic,
  //         },
  //         config
  //       );
  //       console.log(data);

  //       toast({
  //         title: "Registration Successful",
  //         status: "success",
  //         duration: 5000,
  //         isClosable: true,
  //         position: "bottom",
  //       });
  //       localStorage.setItem("userInfo", JSON.stringify(data));
  //       setLoading(false);
  //       history.push("/chats");
  //     } catch (error) {
  //       console.log( error.response.data.message)
  //       toast({
  //         title: "Error Occured!",
  //         description: error.response.data.message,
  //         status: "error",
  //         duration: 5000,
  //         isClosable: true,
  //         position: "bottom",
  //       });
  //       setLoading(false);
  //     }
  // }
  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={Loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
  // return (
  //   <VStack spacing={"5px"}  >
  //   <FormControl id="first-name" isRequired >
  //   <FormLabel>Name</FormLabel>
  //   <Input placeholder='Enter your name' onChange={(e)=>setname(e.target.value)} ></Input>
  //   </FormControl>
  //   <FormControl id="email" isRequired >
  //   <FormLabel>email</FormLabel>
  //   <Input placeholder='Enter your email' onChange={(e)=>setemail(e.target.value)} ></Input>
  //   </FormControl>
  //   <FormControl id="password" isRequired >
  //   <FormLabel>password</FormLabel>
  //   <InputGroup>
  //   <Input type={!show?"password":"text"} placeholder='Enter your password' onChange={(e)=>setpassword(e.target.value)} ></Input>
  //   <InputRightElement w={"4.5rem"} >
  //   <Button h={"1.75rem"} size="sm" onClick={()=>setshow(!show)} >{show?"Hide":"Show"}</Button>
  //   </InputRightElement>
  //   </InputGroup>
  //   </FormControl>
  //   <FormControl id="Confirm password" isRequired >
  //   <FormLabel>Confirm password</FormLabel>
  //   <InputGroup>
  //   <Input type={!show?"password":"text"} placeholder='Confirm password' onChange={(e)=>setconformpassword(e.target.value)} ></Input>
  //   <InputRightElement w={"4.5rem"} >
  //   <Button h={"1.75rem"} size="sm" onClick={()=>setshow(!show)} >{show?"Hide":"Show"}</Button>
  //   </InputRightElement>
  //   </InputGroup>
  //   </FormControl>
  //   <FormControl>
  //   <FormLabel>Upload your Picture</FormLabel>
  //   <Input type="file" p="1.5" accept='image/*' onChange={(e)=>postDetails(e.target.files[0])} ></Input>
  //   </FormControl>
  //   <Button isLoading={Loading} colorScheme={"blue"} width="100%"  style={{marginTop:15}} onClick={submitHandler} >
  //   SignUp
  //   </Button>
  //   </VStack>
  // )
};

export default Signup;
