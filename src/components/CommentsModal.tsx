import { useEffect, useState } from "react";
import { Box, Button, Divider, FlatList, Heading, HStack } from "native-base";

import { UserDTO } from "../DTO/userDTO";
import { CommentsDTO } from "../DTO/CommentsDTO";
import { CarComments } from "./CardComments";

import { AntDesign, Ionicons } from "@expo/vector-icons";

import { api } from "../services/api";
import { SafeAreaView } from "react-native-safe-area-context";

interface CardPostProps {
  id: string;
}

export function CommentsModal({ id }: CardPostProps) {
  const [comments, setComments] = useState<CommentsDTO[]>([]);

  async function fetchCommentsAndUsers() {
    const { data } = await api.get(`/posts/${id}/comments`);

    setComments(data);
  }

  useEffect(() => {
    fetchCommentsAndUsers();
  }, []);

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

          <AntDesign name="close" size={24} color="black" />
        </HStack>

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
      </Box>
    </SafeAreaView>
  );
}
