export const tokens = {
  // Spacing System
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  // Boder Radius
  radii: {
    xs: 4,
    sm: 6,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    full: 9999,
  },

  // Fonts Sizes
  fontSizes: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
    display: 32,
  },

  // Font Weights
  fontWeights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // Shadow System
  shadows: {
    xs: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },

    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },

    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },

    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
    },
  },

  // Component Height
  sizes: {
    buttonHeight: 48,
    inputHeight: 50,
    iconSm: 16,
    iconMd: 24,
    iconLg: 32,
  },

  // Typography
  typography: {
    title: {
      fontSize: 20,
      fontWeight: '700' as const,
      lineHeight: 28,
    },

    subtitle: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 22,
    },

    body: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },

    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16,
    },

    label: {
      fontSize: 13,
      fontWeight: '500' as const,
      lineHeight: 18,
    },
  },
} as const;