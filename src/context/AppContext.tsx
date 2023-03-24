import { createContext, ReactNode, useEffect, useState } from "react";
import { CommentsDTO } from "../DTO/CommentsDTO";
import { PostDTO } from "../DTO/postDTO";
import { UserDTO } from "../DTO/userDTO";
import { api } from "../services/api";

interface AppContextProps {
  posts: PostDTO[];
  users: UserDTO[];
  comments: CommentsDTO[];
  postId: string;
  loading: boolean;
  fetchPosts: () => Promise<void>;
  fetchComments: (postId: string) => Promise<void>;
  setPostId: (id: string) => void;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

interface ContextProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: ContextProps) {
  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [comments, setComments] = useState<CommentsDTO[]>([]);

  const [loading, setLoading] = useState(false);
  const [postId, setPostId] = useState("");

  async function fetchPosts() {
    try {
      setLoading(true);

      const getUsers = await api.get("/users");
      const getPosts = await api.get("/posts", {
        params: {
          _limit: 10,
        },
      });
      // Tem 100 posts, porém são posts repetidos, por isso o limite de 10
      // Fora que também a API não tem paginação.
      // Exibir 100 item de uma vez seria não performático

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

  async function fetchComments(postId: string) {
    try {
      const getComments = await api.get(`/posts/${postId}/comments`);

      setComments(getComments.data);
    } catch (error) {
      console.log(error, "erro nos comentarios");
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const value = {
    posts,
    users,
    comments,
    postId,
    loading,
    fetchPosts,
    fetchComments,
    setPostId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
