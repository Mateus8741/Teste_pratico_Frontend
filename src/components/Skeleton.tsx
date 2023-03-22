import { Center, VStack, Skeleton } from "native-base";

export function SkeletonBody() {
  return (
    <Center w="100%">
      <VStack w="90%" maxW="400" p={4} space={8} overflow="hidden" rounded="md">
        <Skeleton.Text px="4" startColor="gray.600" />
        <Skeleton.Text px="4" startColor="gray.600" />
        <Skeleton.Text px="4" startColor="gray.600" />
      </VStack>
    </Center>
  );
}
