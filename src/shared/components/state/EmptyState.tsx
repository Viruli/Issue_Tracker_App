import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../hooks/useTheme";

type Props = {
  message?: string;
};

const EmptyState = ({ message = "No data found" }: Props) => {
  const { palette } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <Text
        style={{
          fontSize: 40,
          marginBottom: 12,
        }}
      >
        📭
      </Text>

      <Text
        style={{
          color: palette.textMuted,
          fontSize: 16,
        }}
      >
        {message}
      </Text>
    </View>
  );
};

export default EmptyState;
