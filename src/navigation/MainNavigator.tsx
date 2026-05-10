import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import IssueDetailsScreen from "../features/issues/screens/IssueDetailsScreen";
import CreateIssueScreen from "../features/issues/screens/CreateIssueScreen";
import LogoutButton from "../shared/components/LogoutButton";

import { MainStackParamList } from "./types";
import { useTheme } from "../shared/hooks/useTheme";
import { AppLogo } from "../shared/components/AppLogo";

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  const { palette } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: palette.background,
        },

        headerTintColor: palette.text,

        headerTitleStyle: {
          color: palette.text,
          fontWeight: "600",
        },

        headerTitleAlign: "left",

        headerRight: () => <LogoutButton />,
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{ headerTitle: () => <AppLogo /> }}
      />

      <Stack.Screen
        name="CreateIssue"
        component={CreateIssueScreen}
        options={{
          title: "Create Issue",
        }}
      />

      <Stack.Screen
        name="IssueDetails"
        component={IssueDetailsScreen}
        options={{
          title: "Issue Details",
        }}
      />

      <Stack.Screen
        name="EditIssue"
        component={CreateIssueScreen}
        options={{
          title: "Edit Issue",
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
