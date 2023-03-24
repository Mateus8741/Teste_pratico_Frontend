import { HStack, Heading } from "native-base";

export function Logo() {
  return (
    <HStack alignItems="center" alignSelf="center" px={8} pt={6} pb={4}>
      <Heading color="blue.500" fontSize="4xl" fontWeight="bold">
        Daily
      </Heading>
      <Heading
        color="gray.800"
        fontSize="4xl"
        fontWeight="bold"
        fontStyle="italic"
        _ios={{
          fontFamily: "Georgia",
          fontWeight: "bold",
        }}
        _android={{
          fontFamily: "serif",
        }}
      >
        Posts
      </Heading>
    </HStack>
  );
}
