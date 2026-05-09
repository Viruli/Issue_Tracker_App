import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { tokens } from '../theme/tokens';

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
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 18,
        marginRight: 8,
        backgroundColor: selected ? palette.primary : palette.surface,
        borderWidth: 1,
        borderColor: selected ? palette.primary : palette.border,
      }}
    >
      <Text
        style={{
          color: selected ? '#fff' : palette.text,
          fontSize: tokens.fontSizes.sm,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};