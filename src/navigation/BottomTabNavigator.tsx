import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../shared/hooks/useTheme";

import DashboardScreen from "../features/issues/screens/DashboardScreen";
import IssueListScreen from "../features/issues/screens/IssueListScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { palette } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: palette.surface,
          borderTopColor: palette.border,
        },

        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: palette.textMuted,

        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === "Dashboard") {
            iconName = "grid-outline";
          } else if (route.name === "Issues") {
            iconName = "list-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Issues" component={IssueListScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
