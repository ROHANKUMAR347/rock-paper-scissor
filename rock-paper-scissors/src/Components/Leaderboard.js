import React from "react";
import { Box, List, ListItem, Text } from "@chakra-ui/react";

const Leaderboard = ({ players }) => {
  const sortedPlayers = Object.values(players).sort(
    (a, b) => b.score - a.score
  );

  return (
    <Box>
      <Text>Leaderboard</Text>
      <List>
        {sortedPlayers.map((player, index) => (
          <ListItem key={index}>
            {player.username} - {player.score}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Leaderboard;
