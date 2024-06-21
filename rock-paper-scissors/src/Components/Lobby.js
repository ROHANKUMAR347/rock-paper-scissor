import React from "react";
import { Box, Button, List, ListItem } from "@chakra-ui/react";

const Lobby = ({ players, onPlay }) => {
  return (
    <Box>
      <List>
        {Object.keys(players).map((id) => (
          <ListItem key={id}>
            {players[id].username}
            <Button onClick={() => onPlay(id)}>Play</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Lobby;
