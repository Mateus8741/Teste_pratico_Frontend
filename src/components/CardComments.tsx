import { useEffect, useState } from "react";

import { addDays, format } from "date-fns";

import {
  Box,
  Avatar,
  Stack,
  Text,
  Heading,
  HStack,
  useTheme,
} from "native-base";

import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
  Feather,
} from "@expo/vector-icons";

interface CarCommentsProps {
  body: string;
  userEmail: string;
}

export function CarComments({ body, userEmail }: CarCommentsProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [countFav, setCountFav] = useState(
    Math.floor(Math.random() * 862) + 50
  );

  const { colors } = useTheme();

  function Favorite() {
    setIsFavorite(!isFavorite);
    setCountFav((state) => state + 1);
  }

  // Cores randomicas para os avatares
  const randomColor = () => {
    const colors = [
      "red.500",
      "orange.500",
      "yellow.500",
      "green.500",
      "teal.500",
      "blue.500",
      "cyan.500",
      "purple.500",
      "pink.500",
      "emerald.500",
    ];
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
  };

  const currentDate = new Date();

  const randomDays = Math.floor(Math.random() * 365);

  const randomDate = addDays(currentDate, randomDays);

  const formattedDate = format(randomDate, "dd/MM/yyyy");
  //  Como não tenho datas concretas, fiz datas aleatórias

  const formattedCounter =
    (Math.floor(Math.random() * 862) + 50 / 1000).toFixed(1) + " mil";
  // Como não tenho contadores concretos, fiz contadores aleatórios

  return (
    <Box
      w={390}
      rounded="lg"
      overflow="hidden"
      _dark={{
        backgroundColor: "gray.700",
      }}
      _light={{
        backgroundColor: "white",
      }}
    >
      <HStack pl="4" pt="4" alignItems="center">
        <Avatar bg={randomColor()} size="sm" alignItems="center">
          <MaterialIcons name="person" size={20} color="white" />
        </Avatar>

        <Stack pl="4">
          <Stack space={2}>
            <Heading size="sm" ml="-1">
              {userEmail}
            </Heading>
            <Text
              fontSize="xs"
              _light={{
                color: "gray.300",
              }}
              _dark={{
                color: "violet.800",
              }}
              fontWeight="500"
              ml="-0.5"
              mt="-1"
            >
              {formattedDate}
            </Text>
          </Stack>
        </Stack>
      </HStack>

      <Stack p="4" space={3}>
        <Text
          fontSize="sm"
          fontWeight="400"
          textAlign="left"
          _light={{
            color: "gray.900",
          }}
          _dark={{
            color: "violet.100",
          }}
        >
          {body}
        </Text>

        <HStack alignItems="center" justifyContent="space-between">
          <HStack alignItems="center" space={2}>
            <MaterialCommunityIcons
              onPress={Favorite}
              name={isFavorite ? "heart" : "heart-outline"}
              color={colors.red[600]}
              size={24}
            />
            <Text color="coolGray.600">{countFav}</Text>
          </HStack>

          <HStack alignItems="center" space={2}>
            <AntDesign name="retweet" size={24} color={colors.green[600]} />
            <Text color="coolGray.600">{formattedCounter}</Text>
          </HStack>

          {/* <HStack alignItems="center" space={2}>
            <MaterialCommunityIcons name="calendar-clock" size={24} />
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontWeight="400"
            >
              {formattedDate}
            </Text>
          </HStack> */}

          <HStack alignItems="center" space={2}>
            <Feather name="share" size={24} color={colors.blue[400]} />
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontWeight="400"
            >
              Compartilhar
            </Text>
          </HStack>
        </HStack>
      </Stack>
    </Box>
  );
}
