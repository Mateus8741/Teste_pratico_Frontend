import {
  Box,
  Center,
  Stack,
  Heading,
  HStack,
  Text,
  Avatar,
  VStack,
  Button,
} from "native-base";

import { MaterialIcons } from "@expo/vector-icons";
import { PostDTO } from "../DTO/postDTO";

type CardPostProps = PostDTO & {
  onPress: () => void;
};

export function CardPost({ id, userId, title, body, onPress }: CardPostProps) {
  function CurrentTime() {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    return `postado ás ${hour}:${min}`;
  }

  return (
    <Box alignItems="center" >
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
            backgroundColor: "gray.700",
          }}
          _light={{
            backgroundColor: "gray.100",
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
            </HStack>
          </Stack>
        </Box>
      </Button>
    </Box>
  );
}
