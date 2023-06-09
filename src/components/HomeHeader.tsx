import { Avatar, Heading, HStack, Text, VStack } from "native-base";

export function HomeHeader() {
  const urlImage =
    "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

  return (
    <HStack bg="gray.900" pt={16} pb={5} px={8} alignItems="center">
      <Avatar
        bg="indigo.500"
        size="lg"
        marginRight={4}
        source={{
          uri: urlImage,
        }}
      >
        JB
      </Avatar>
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          Jhon Doe
        </Heading>
      </VStack>
    </HStack>
  );
}
