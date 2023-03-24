import {
  Button,
  Divider,
  FlatList,
  Heading,
  Text,
  HStack,
  VStack,
} from "native-base";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { CardPost } from "../components/CardPost";
import { CommentsModal } from "../components/CommentsModal";
import {
  CustomBottomSheet,
  MyBottonShetHandle,
} from "../components/CustomBottomSheet/CustomBottomSheet";

import { HomeHeader } from "../components/HomeHeader";
import { Logo } from "../components/Logo";
import { SkeletonBody } from "../components/Skeleton";
import { PostDTO } from "../DTO/postDTO";
import { UserDTO } from "../DTO/userDTO";
import { useApp } from "../hooks/useApp";
import { api } from "../services/api";

export function Home() {
  const modal = useRef<MyBottonShetHandle>(null);
  const size = Platform.OS === "ios" ? RFValue(620) : RFValue(575);

  const { fetchComments, posts, loading, users } = useApp();

  const randomNumber = () => {
    return Math.floor(Math.random() * 10);
  };

  function handleOpenModal(id: string) {
    fetchComments(id);

    modal.current?.handleParentOpenBottonShet();
  }

  function handleCloseModal() {
    modal.current?.handleParentCloseBottonShet();
  }

  return (
    <>
      <VStack flex={1} bg="white">
        <HomeHeader />

        <VStack flex={1}>
          <Logo />

          <VStack px={8} alignItems="flex-start" justifyContent="center">
            <Text fontSize="xl" fontWeight="bold">
              Destaques de hoje
            </Text>
            <Divider
              my="1"
              _light={{
                bg: "muted.700",
              }}
              _dark={{
                bg: "muted.50",
              }}
            />
          </VStack>

          <HStack space={4}>
            {loading ? (
              <SkeletonBody />
            ) : (
              <FlatList
                data={posts}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <CardPost
                    title={item.title}
                    body={item.body}
                    userName={
                      users[randomNumber()]
                        ? users[randomNumber()].name
                        : "User Undefined"
                    }
                    onPress={() => handleOpenModal(String(item.id))}
                  />
                )}
                ItemSeparatorComponent={() => (
                  <Divider
                    my="2"
                    _light={{
                      bg: "muted.700",
                    }}
                    _dark={{
                      bg: "muted.50",
                    }}
                  />
                )}
                numColumns={1}
                showsVerticalScrollIndicator={false}
              />
            )}
          </HStack>
        </VStack>
      </VStack>

      <CustomBottomSheet ref={modal} height={size}>
        <CommentsModal onPress={handleCloseModal} />
      </CustomBottomSheet>
    </>
  );
}
