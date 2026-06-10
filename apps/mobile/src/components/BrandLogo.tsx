import { StyleSheet, Text, View } from 'react-native';

interface BrandLogoProps {
  abbr: string;
  bgColor: string;
  size?: number;
}

export function BrandLogo({ abbr, bgColor, size = 46 }: BrandLogoProps) {
  const radius = size * 0.22;
  const fontSize = abbr.length > 2 ? 10 : abbr.length === 2 ? 16 : 13;
  return (
    <View
      style={[
        styles.base,
        { width: size, height: size, borderRadius: radius, backgroundColor: bgColor },
      ]}
    >
      <Text
        style={[
          styles.text,
          { fontSize, letterSpacing: abbr.length >= 4 ? 0.5 : 0 },
        ]}
        numberOfLines={1}
      >
        {abbr}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
