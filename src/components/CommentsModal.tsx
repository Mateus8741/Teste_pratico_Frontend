import { Box, Button, Divider, FlatList, Heading, HStack } from "native-base";

import { CarComments } from "./CardComments";

import { AntDesign, Ionicons } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";
import { useApp } from "../hooks/useApp";
import { SkeletonBody } from "./Skeleton";

interface Props {
  onPress: () => void;
}

export function CommentsModal({ onPress }: Props) {
  const { comments, loading } = useApp();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Box background="white">
        <HStack p={4} justifyContent="space-between" alignItems="center">
          <Ionicons name="shield-checkmark-outline" size={24} color="black" />

          <Heading>Comentários ({comments.length})</Heading>

          <AntDesign name="close" size={24} color="black" onPress={onPress} />
        </HStack>

        {loading ? (
          <SkeletonBody />
        ) : (
          <FlatList
            mb={16}
            showsVerticalScrollIndicator={false}
            data={comments}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <Button
                bg="transparent"
                _pressed={{
                  bg: "transparent",
                }}
              >
                <CarComments body={item.body} userEmail={item.email} />
              </Button>
            )}
            ItemSeparatorComponent={() => (
              <Divider
                my="2"
                _light={{
                  bg: "muted.300",
                }}
                _dark={{
                  bg: "muted.50",
                }}
              />
            )}
          />
        )}
      </Box>
    </SafeAreaView>
  );
}
