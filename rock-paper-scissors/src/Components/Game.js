import React, { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";

const Game = ({ opponent, onMove }) => {
  const [move, setMove] = useState(null);

  const handleMove = (selectedMove) => {
    setMove(selectedMove);
    onMove(selectedMove);
  };

  return (
    <Box>
      <Text>Playing against: {opponent.username}</Text>
      <Button onClick={() => handleMove("rock")}>Rock</Button>
      <Button onClick={() => handleMove("paper")}>Paper</Button>
      <Button onClick={() => handleMove("scissors")}>Scissors</Button>
    </Box>
  );
};

export default Game;
