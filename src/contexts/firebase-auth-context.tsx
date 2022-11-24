import { createContext, useEffect, useReducer } from "react";
import type { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import firebaseApp, { auth } from "../lib/firebase";
import {
  getAuth,
  signInWithEmailAndPassword as signInWithEmailAndPassword_,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword as createUserWithEmailAndPassword_,
  signInWithRedirect,
} from "firebase/auth";
import type { User } from "../types/user";
//const auth = getAuth(firebaseApp);

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

interface AuthContextValue extends State {
  platform: "Firebase";
  createUserWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type AuthStateChangedAction = {
  type: "AUTH_STATE_CHANGED";
  payload: {
    isAuthenticated: boolean;
    user: User | null;
  };
};

type Action = AuthStateChangedAction;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state: State, action: Action): State => {
  if (action.type === "AUTH_STATE_CHANGED") {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

export const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  platform: "Firebase",
  createUserWithEmailAndPassword: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    () =>
      auth.onAuthStateChanged((user) => {
        console.log({ user });

        //console.log(user.displayName);

        if (user) {
          // Here you should extract the complete user profile to make it available in your entire app.
          // The auth state only provides basic information.
          dispatch({
            type: "AUTH_STATE_CHANGED",
            payload: {
              isAuthenticated: true,
              user: {
                id: user.uid,
                avatar: user.photoURL ?? "",
                email: user.email ?? "",
                name: user.displayName ?? "",
                plan: "Premium",
              },
            },
          });
        } else {
          dispatch({
            type: "AUTH_STATE_CHANGED",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      }),
    [dispatch]
  );

  const signInWithEmailAndPassword = (email: string, password: string): Promise<any> =>
    signInWithEmailAndPassword_(auth, email, password);

  const signInWithGoogle = (): Promise<any> => {
    console.log("signInWithGoogle");
    const provider = new GoogleAuthProvider();

    return signInWithRedirect(auth, provider);
  };

  const createUserWithEmailAndPassword = async (email: string, password: string): Promise<any> =>
    createUserWithEmailAndPassword_(auth, email, password);

  const logout = async (): Promise<void> => {
    await auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: "Firebase",
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
