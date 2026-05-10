import React from "react";
import { View, Text } from "react-native";
import { Button } from "../Button";
import { useTheme } from "../../hooks/useTheme";

type Props = {
  message?: string;
  onRetry?: () => void;
};

const ErrorState = ({ message = "Something went wrong", onRetry }: Props) => {
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
        ⚠️
      </Text>

      <Text
        style={{
          color: palette.text,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        {message}
      </Text>

      {onRetry && (
        <Button style={{ padding: 10 }} title="OK" onPress={onRetry} />
      )}
    </View>
  );
};

export default ErrorState;
