import { useCallback, useState } from "react";
import { useCurrentUser } from "../providers/UserProvider";
import { login } from "../services/usersApiService";
import {
  getUser,
  removeToken,
  setTokenInLocalStorage,
} from "../services/localStorageService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useSnack } from "../../providers/SnackbarProvider";
import { signup } from "../services/usersApiService";
import normalizeUser from "../helpers/initialForms/normalizeUser";

export default function useUsers() {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const {setUser, setToken } = useCurrentUser();
  const navigate = useNavigate();
  const setSnack = useSnack();

  const handleLogin = useCallback(async (userLogin) => {
    setIsLoading(true);
    try {
      const token = await login(userLogin);
      setTokenInLocalStorage(token);
      setToken(token);
      setUser(getUser());
      navigate(ROUTES.Restaurants);
    } catch (err) {
      console.log(err);
      setError(err.message);
      setSnack("error", err.message);
    }
    setIsLoading(false);
  }, [setToken,setUser,navigate]);

/*  const handleLogout = useCallback(() => {
    removeToken();
    setUser(null);
  }, [setUser]); */

  const handleLogout = useCallback(() => {
    console.log("the function works");
    removeToken();
    setUser(null);
    
  }, [setUser]);

  const handleSignup = useCallback(
    async (userFromClient) => {
      setIsLoading(true);
      try {
        const normalizedUser = normalizeUser(userFromClient);
        await signup(normalizedUser);
        await handleLogin({
          email: userFromClient.email,
          password: userFromClient.password,
        });
      } catch (error) {
        setError(error.message);
      } 
        setIsLoading(false);
      
    },
    [handleLogin]
  );

  return {
    isLoading,
    error,
    handleLogin,
    handleLogout,
    handleSignup
    
  };
}
