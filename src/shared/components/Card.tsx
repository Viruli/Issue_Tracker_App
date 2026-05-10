import React from "react";
import { View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { tokens } from "../theme/tokens";

export const Card = ({ children }: { children: React.ReactNode }) => {
  const { palette } = useTheme();

  return (
    <View
      style={{
        backgroundColor: palette.surface,
        padding: tokens.spacing.md,
        borderRadius: tokens.radii.md,
        marginBottom: tokens.spacing.sm,
        borderWidth: 1,
        borderColor: palette.border,
        ...tokens.shadows.sm,
      }}
    >
      {children}
    </View>
  );
};
