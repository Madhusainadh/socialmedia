import logo from './logo.svg';
import './App.css';
import { Box, Button } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import { ChatPage } from './Pages/ChatPage';

function App() {
  return (
    <Box className="App">
  
<Route path={"/"} component={Homepage} exact/>
<Route path={"/chats"} component={ChatPage} exact />

    </Box>
  );
}

export default App;
