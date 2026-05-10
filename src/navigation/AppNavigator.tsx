import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import { useAuthStore } from "../features/auth/store/authStore";

const AppNavigator = () => {
  const isLoggedIn = useAuthStore((s) => s.isAuthenticated);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
