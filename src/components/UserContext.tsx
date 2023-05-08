import { useLocalStorage } from "@rehooks/local-storage";
import { createContext, useCallback, useContext } from "react";
import { Gif } from "../lib/gif";

export interface User {
  profilePic: Partial<Gif>;
  profileHistory: Partial<Gif>[];
}

export interface IUserContext extends User {
  setProfilePic: (gif: Gif) => Promise<void>;
}

const defaultUserContext = {
  profilePic: {
    images: {
      preview_gif: {
        url: "https://media3.giphy.com/media/oQOunIN8Qju6I/giphy-preview.gif?cid=76148d5ei7ooemhga141b989z8ze19l5wwr6f88v4kbgqu61&ep=v1_gifs_search&rid=giphy-preview.gif&ct=g",
      },
    },
  } as Gif,
  profileHistory: [],
  setProfilePic: (gif: Gif) => Promise.resolve(),
};

export const UserContext = createContext<IUserContext>(defaultUserContext);

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useLocalStorage<User>("user", {
    profilePic: defaultUserContext.profilePic as any,
    profileHistory: defaultUserContext.profileHistory,
  });

  const setProfilePic = useCallback(
    async (gif: Gif) => {
      setUser({
        profilePic: gif,
        profileHistory: [...user.profileHistory, gif],
      });
    },
    [user, setUser]
  );

  return (
    <UserContext.Provider value={{ ...user, setProfilePic }}>
      {children}
    </UserContext.Provider>
  );
};
