import { SetStateAction, createContext } from "react";

export interface IUser {
  id: string;
  displayName: string;
  accessToken: string;
  nim?: string;
  authType: string;
}

export type CurrentUserContextType = {
  user: IUser;
  setUser: React.Dispatch<SetStateAction<IUser>> | undefined;
};

export const CurrentUserContext = createContext<CurrentUserContextType>({
  user: {
    id: "",
    displayName: "",
    accessToken: "",
    nim: "",
    authType: "",
  },
  setUser: undefined,
});
