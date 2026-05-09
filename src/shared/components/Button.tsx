import React from 'react';

import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { tokens } from '../theme/tokens';

type Props = {
  title: string;
  onPress: () => void;

  loading?: boolean;
  disabled?: boolean;

  style?: ViewStyle;
  textStyle?: TextStyle;
};

export const Button = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  textStyle,
}: Props) => {
  const { palette } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        {
          backgroundColor: palette.primary,

          height: tokens.sizes.buttonHeight,

          borderRadius: tokens.radii.md,

          justifyContent: 'center',
          alignItems: 'center',

          ...tokens.shadows.sm,

          opacity: disabled ? 0.5 : 1,
        },

        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text
          style={[
            {
              color: '#fff',
              fontSize: tokens.fontSizes.md,
              fontWeight: tokens.fontWeights.semibold,
            },

            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};