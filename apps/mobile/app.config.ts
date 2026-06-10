import { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'NIL Assessment',
  slug: 'nil-assessment',
  version: '1.0.0',
  orientation: 'portrait',
  scheme: 'nil',
  platforms: ['ios', 'android'],
  newArchEnabled: true,
  ios: {
    supportsTablet: false,
    bundleIdentifier: 'com.nil.assessment',
  },
  android: {
    package: 'com.nil.assessment',
  },
  plugins: ['expo-router'],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    apiUrl: process.env.EXPO_PUBLIC_API_URL,
  },
});
