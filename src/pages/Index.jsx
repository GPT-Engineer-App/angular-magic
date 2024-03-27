import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Heading, Input, Button, useToast, Text, FormControl, FormLabel } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  // State management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  // Function to handle login
  const handleLogin = async () => {
    try {
      const response = await fetch("https://backengine-axnx.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.accessToken);
        toast({
          title: "Login successful.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // Navigate to dashboard or reload page
      } else {
        throw new Error("Failed to login. Please check your credentials.");
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Function to handle signup
  const handleSignup = async () => {
    try {
      const response = await fetch("https://backengine-axnx.fly.dev/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 204) {
        toast({
          title: "Signup successful. Please log in.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // Clear fields or navigate to login page
      } else {
        throw new Error("Failed to signup.");
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Box p={8}>
        <VStack spacing={4} align="stretch">
          <Heading>Welcome to the Interactive API App</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button leftIcon={<FaSignInAlt />} onClick={handleLogin}>
            Login
          </Button>
          <Text textAlign="center">OR</Text>
          <Button leftIcon={<FaUserPlus />} onClick={handleSignup}>
            Signup
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
