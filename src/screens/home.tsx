import {
  Button,
  Divider,
  FlatList,
  Heading,
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
import { SkeletonBody } from "../components/Skeleton";
import { PostDTO } from "../DTO/postDTO";
import { UserDTO } from "../DTO/userDTO";
import { api } from "../services/api";

export function Home() {
  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [users, setUsers] = useState<UserDTO[]>([]);

  const modal = useRef<MyBottonShetHandle>(null);
  const size = Platform.OS === "ios" ? RFValue(270) : RFValue(270);

  const [loading, setLoading] = useState(false);

  async function fetchPosts() {
    try {
      setLoading(true);

      const getPosts = await api.get("/posts", {
        params: {
          _limit: 10,
        },
      });
      // Tem 100 posts, porém são posts repetidos, por isso o limite de 10
      // Fora que também a API não tem paginação.
      // Exibir 100 item de uma vez seria não performático

      const getUsers = await api.get("/users");

      Promise.all([getPosts, getUsers]).then((responses) => {
        const postsData = responses[0].data;
        const usersData = responses[1].data;

        setPosts(postsData);
        setUsers(usersData);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {/* <CommentsModal id="8" /> */}
      <VStack flex={1} bg="gray.100">
        <HomeHeader />

        <VStack flex={1}>
          <Heading color="gray.800" fontSize="lg" p={8}>
            Posts
          </Heading>

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
                    onPress={() => console.log(item.id)}
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

      {/* <CustomBottomSheet ref={modal} height={size}>

      </CustomBottomSheet> */}
    </>
  );
}
