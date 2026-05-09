import React from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
} from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { tokens } from '../theme/tokens';

type Props = TextInputProps & {
  label?: string;
  error?: string;
};

export const Input = ({
  label,
  error,
  ...props
}: Props) => {
  const { palette } = useTheme();

  return (
    <View
      style={{
        marginBottom: tokens.spacing.md,
      }}
    >
      {/* LABEL */}
      {label && (
        <Text
          style={{
            color: palette.text,
            marginBottom: 8,
            fontSize: tokens.fontSizes.sm,
            fontWeight: tokens.fontWeights.medium,
          }}
        >
          {label}
        </Text>
      )}

      {/* INPUT */}
      <TextInput
        placeholderTextColor={palette.textMuted}
        {...props}
        style={[
          {
            backgroundColor: palette.surface,
            borderWidth: 1,
            borderColor: error
              ? palette.danger
              : palette.border,

            borderRadius: tokens.radii.md,

            paddingHorizontal: tokens.spacing.md,
            paddingVertical: 14,

            color: palette.text,

            fontSize: tokens.fontSizes.md,

            ...tokens.shadows.xs,
          },

          props.multiline && {
            minHeight: 120,
            textAlignVertical: 'top',
          },

          props.style,
        ]}
      />

      {/* ERROR TEXT */}
      {error && (
        <Text
          style={{
            color: palette.danger,
            marginTop: 6,
            fontSize: tokens.fontSizes.sm,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};