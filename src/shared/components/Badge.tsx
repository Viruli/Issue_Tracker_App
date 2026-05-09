import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { tokens } from '../theme/tokens';

type Props = {
  label: string;
  type?: 'success' | 'warning' | 'danger' | 'info';
};

export const Badge = ({ label, type = 'info' }: Props) => {
  const { palette } = useTheme();

  const getColor = () => {
    switch (type) {
      case 'success':
        return palette.success;
      case 'warning':
        return palette.warning;
      case 'danger':
        return palette.danger;
      default:
        return palette.primary;
    }
  };

  return (
    <Text
      style={{
        backgroundColor: getColor(),
        color: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: tokens.radii.full,
        fontSize: tokens.fontSizes.xs,
        overflow: 'hidden',
        alignSelf: 'flex-start',
      }}
    >
      {label}
    </Text>
  );
};