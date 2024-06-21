import React, { useState } from "react";
import { Box, Input, Button } from "@chakra-ui/react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");

  return (
    <Box>
      <Input
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button onClick={() => onLogin(username)}>Login</Button>
    </Box>
  );
};

export default Login;
