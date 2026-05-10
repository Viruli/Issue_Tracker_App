import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { tokens } from "../theme/tokens";

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export const FilterChip = ({ label, selected, onPress }: Props) => {
  const { palette } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 34,
        paddingHorizontal: 14,
        borderRadius: 18,
        marginRight: 8,
        backgroundColor: selected ? palette.primary : palette.surface,
        borderWidth: 1,
        borderColor: selected ? palette.primary : palette.border,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        numberOfLines={1}
        style={{
          color: selected ? "#fff" : palette.text,
          fontSize: tokens.fontSizes.sm,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
