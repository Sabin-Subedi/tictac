import {
  Grid,
  Box,
  Flex,
  GridItem,
  Text,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { useGameContext } from "./GameContext";
import React, { useState } from "react";
import { FiX, FiCircle } from "react-icons/fi";
import { TbReload } from "react-icons/tb";
import { PLAYER } from "./constant";

function App() {
  const [step, setStep] = useState(0);
  const { gameControl } = useGameContext();
  const gameData = gameControl.gameData;
  const player1 = PLAYER[0];
  const player2 = PLAYER[1];
  const currentPlayer = gameControl.currentPlayer === 0 ? player1 : player2;
  const gameWin =
    gameControl.gameWonBy === 0
      ? player1
      : gameControl.gameWonBy === 1
      ? player2
      : null;
  const endGame = Boolean(gameWin !== null);

  return (
    <Flex
      position="relative"
      background="blue.100"
      w="full"
      direction="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
    >
      <Flex
        w="full"
        px="2rem"
        pt="1rem"
        position="absolute"
        top={0}
        justifyContent="space-between"
        alignItems="center"
      >
        {PLAYER.map((item, index) => {
          return (
            <Flex
              alignItems="center"
              gap="0.4rem"
              color={`${item.color}.600`}
              fontWeight={700}
              fontSize="2rem"
            >
              <Text>{item.label}:</Text>
              {item.icon}
            </Flex>
          );
        })}
      </Flex>
      <Text
        sx={{
          fontSize: "3rem",
          textAlign: "center",
          mb: "2rem",
          fontWeight: 700,
          color: `${currentPlayer.color}.600`,
        }}
      >
        {gameWin !== null
          ? gameWin.label + " Wins"
          : `Current Player: ${currentPlayer.label}`}
      </Text>
      <Box position={"relative"}>
        <Grid
          templateColumns="repeat(3,1fr)"
          sx={{
            filter: endGame ? "blur(10px)" : "none",
          }}
        >
          {new Array(3).fill(Array.from(Array(3).keys())).map((i, iIndex) => {
            return i?.map((j, jIndex) => {
              const currentValue = gameData[iIndex][jIndex];
              const playerData =
                currentValue === 0 ? player1 : currentValue === 1 && player2;

              return (
                <GridItem key={`row_${i}_col_${j}`}>
                  <Flex
                    w="10rem"
                    h="10rem"
                    id={`${iIndex}_${jIndex}`}
                    alignItems="center"
                    justifyContent="center"
                    borderBottom={iIndex < 2 ? "5px solid" : "none"}
                    borderRight={jIndex < 2 ? "5px solid" : "none"}
                    sx={{
                      transition: "all 0.4s ease-in-out",
                      cursor: playerData || endGame ? "not-allowed" : "pointer",
                      fontSize: "5rem",
                      color: `${playerData.color}.900`,
                      borderColor: "gray.700",
                      backgroundColor: `${playerData.color}.300`,
                    }}
                    _hover={
                      !playerData && !endGame
                        ? {
                            background: `${currentPlayer.color}.400`,
                          }
                        : {}
                    }
                    onClick={(e) => {
                      e.stopPropagation();

                      gameControl.selectBox({
                        selectedRow: iIndex,
                        selectedCol: jIndex,
                      });

                      setStep(step + 1);
                    }}
                    role="group"
                  >
                    {playerData
                      ? playerData.icon
                      : !endGame && (
                          <Box
                            opacity={0}
                            color={`${currentPlayer.color}.900`}
                            transition="all 0.4s ease-in-out"
                            _groupHover={{
                              opacity: 0.7,
                              display: "block",
                            }}
                          >
                            {currentPlayer.icon}
                          </Box>
                        )}
                  </Flex>
                </GridItem>
              );
            });
          })}
        </Grid>

        {endGame && (
          <Flex
            w="full"
            h="full"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,

              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Text
              sx={{
                fontSize: "2rem",
                fontWeight: 500,
              }}
            >
              Restart Game
            </Text>

            <Box mt="1rem">
              <IconButton
                variant="link"
                cursor="pointer"
                _hover={{
                  transform: "rotate(45deg)",
                }}
                colorScheme="black"
                as={TbReload}
                onClick={() => {
                  console.log("ss");
                  gameControl.restart();
                  setStep(0);
                }}
              />
            </Box>
          </Flex>
        )}
      </Box>
    </Flex>
  );
}

export default App;
