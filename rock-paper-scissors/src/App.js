import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  Button,
  Input,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const App = () => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [players, setPlayers] = useState([]);
  const [opponent, setOpponent] = useState(null);
  const [move, setMove] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    socket.on("updatePlayers", (players) => {
      setPlayers(players);
      console.log("Players updated:", players);
    });

    socket.on("startGame", (opponent) => {
      setOpponent(opponent);
      setResult(null);
    });

    socket.on("result", (gameResult) => {
      setResult(gameResult);
    });

    socket.on("opponentDisconnected", () => {
      setOpponent(null);
      setResult(null);
    });

    return () => {
      socket.off("updatePlayers");
      socket.off("startGame");
      socket.off("result");
      socket.off("opponentDisconnected");
    };
  }, []);

  const handleLogin = () => {
    socket.emit("join", username);
    setIsLoggedIn(true);
  };

  const handlePlay = (opponentId) => {
    socket.emit("play", opponentId);
  };

  const handleMove = (move) => {
    setMove(move);
    socket.emit("makeMove", { move });
  };

  return (
    <Center minH="100vh" bg="gray.100">
      {!isLoggedIn ? (
        <VStack spacing={4}>
          <Input
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button onClick={handleLogin}>Login</Button>
        </VStack>
      ) : opponent ? (
        <VStack spacing={4}>
          <Text>Playing against: {opponent.username}</Text>
          <HStack spacing={4}>
            <Button onClick={() => handleMove("rock")}>Rock</Button>
            <Button onClick={() => handleMove("paper")}>Paper</Button>
            <Button onClick={() => handleMove("scissors")}>Scissors</Button>
          </HStack>
          {result && (
            <Text>
              {result.result === "win"
                ? "You win!"
                : result.result === "lose"
                ? "You lose!"
                : "It's a draw!"}
            </Text>
          )}
        </VStack>
      ) : (
        <VStack spacing={4}>
          <Text>Available Players:</Text>
          {players.length > 0 ? (
            players.map((player) => (
              <HStack key={player.id} spacing={4}>
                <Text>{player.username}</Text>
                <Button onClick={() => handlePlay(player.id)}>Play</Button>
              </HStack>
            ))
          ) : (
            <Text>No available players</Text>
          )}
        </VStack>
      )}
    </Center>
  );
};

export default App;
