import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { StreamChat } from "stream-chat";

type AuthContext = {
  streamChat?: StreamChat;
  user?: User;
  signup: UseMutationResult<AxiosResponse, unknown, User>;
  login: UseMutationResult<{ token: string; user: User }, unknown, string>;
};
type AuthProviderProps = {
  children: ReactNode;
};
type User = {
  id: string;
  name: string;
  image?: string;
};

const Context = createContext<AuthContext | null>(null);

export function useAuth() {
  return useContext(Context) as AuthContext;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const [streamChat, setStreamChat] = useState<StreamChat>();

  const signup = useMutation({
    mutationFn: (user: User) => {
      return axios.post(`${import.meta.env.VITE_SERVER_URL}/signup`, user);
    },
    onSuccess() {
      navigate("/login");
    },
  });

  const login = useMutation({
    mutationFn: (id: string) => {
      return axios
        .post(`${import.meta.env.VITE_SERVER_URL}/login`, { id })
        .then((res) => res.data as { token: string; user: User });
    },
    onSuccess(data) {
      setUser(data.user);
      setToken(data.token);
    },
  });

  useEffect(() => {
    if (token == null || user == null) return;
    const chat = new StreamChat(import.meta.env.VITE_STREAM_API_KEY);
    if (chat.tokenManager.token === token && chat.userID === user.id) return;
    let isInterrupted = false;
    const connectPromise = chat.connectUser(user, token).then((res) => {
      if (isInterrupted) return;
      setStreamChat(chat);
    });

    return () => {
      isInterrupted = true;
      setStreamChat(undefined);
      connectPromise.then(() => {
        chat.disconnectUser();
      });
    };
  }, [token, user]);

  return (
    <Context.Provider value={{ signup, login, user, streamChat }}>
      {children}
    </Context.Provider>
  );
}
