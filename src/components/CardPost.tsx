import {
  Box,
  Stack,
  Heading,
  HStack,
  Text,
  Avatar,
  Button,
} from "native-base";

import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { PostDTO } from "../DTO/postDTO";
import { RandomColors } from "../utils/RandomColors";

type CardPostProps = PostDTO & {
  onPress: () => void;
  userName: string;
};

export function CardPost({
  title,
  body,
  onPress,
  userName,
}: CardPostProps) {
  function CurrentTime() {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    return `${hour}:${min}`;
  }

  return (
    <Box alignItems="center">
      <Button
        bg="transparent"
        onPress={onPress}
        _pressed={{
          bg: "transparent",
        }}
      >
        <Box
          w={360}
          rounded="lg"
          overflow="hidden"
          _dark={{
            backgroundColor: "gray.800",
          }}
          _light={{
            backgroundColor: "white",
          }}
        >
          <Stack p="4" space={3}>
            <Text
              fontSize="md"
              fontWeight="bold"
              _light={{
                color: "gray.900",
              }}
              _dark={{
                color: "violet.100",
              }}
              mt="-1"
              mb="-2"
            >
              {title}
            </Text>
            <Text
              fontSize="sm"
              fontWeight="400"
              textAlign="left"
              ellipsizeMode="tail"
              numberOfLines={3}
              _light={{
                color: "gray.900",
              }}
              _dark={{
                color: "violet.100",
              }}
            >
              {body}
            </Text>
            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between"
            >
              <HStack alignItems="center">
                <HStack alignItems="center">
                  <Avatar bg={RandomColors()} size="sm" alignItems="center">
                    <MaterialIcons name="person" size={20} color="white" />
                  </Avatar>

                  <Stack pl="4">
                    <HStack space={2} alignItems="center">
                      <Heading size="sm" ml="-1">
                        {userName}
                      </Heading>

                      <Octicons name="dot-fill" size={10} color="black" />

                      <Text
                        color="coolGray.500"
                        _dark={{
                          color: "warmGray.300",
                        }}
                        fontWeight="400"
                      >
                        {CurrentTime()}
                      </Text>
                    </HStack>
                  </Stack>
                </HStack>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Button>
    </Box>
  );
}
