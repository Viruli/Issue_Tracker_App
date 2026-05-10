import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { useTheme } from "../../hooks/useTheme";

const LoadingState = () => {
  const { palette } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={palette.primary} />

      <Text
        style={{
          marginTop: 12,
          color: palette.textMuted,
        }}
      >
        Loading...
      </Text>
    </View>
  );
};

export default LoadingState;
