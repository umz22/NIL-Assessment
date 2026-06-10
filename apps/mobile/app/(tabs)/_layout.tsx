import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

function CircleIcon({ focused }: { focused: boolean }) {
  return (
    <View
      style={[
        styles.circleIcon,
        focused ? styles.circleIconFilled : styles.circleIconOutline,
      ]}
    />
  );
}

function TagIcon({ focused }: { focused: boolean }) {
  return (
    <View style={styles.tagWrapper}>
      <View
        style={[
          styles.tagBody,
          { borderColor: focused ? '#000000' : '#8E8E93' },
        ]}
      />
      <View
        style={[
          styles.tagDot,
          { backgroundColor: focused ? '#000000' : '#8E8E93' },
        ]}
      />
    </View>
  );
}

function PersonIcon({ focused }: { focused: boolean }) {
  const color = focused ? '#000000' : '#8E8E93';
  return (
    <View style={styles.personWrapper}>
      <View style={[styles.personHead, { borderColor: color }]} />
      <View style={[styles.personBody, { borderColor: color }]} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="earnings"
        options={{
          title: 'Earnings',
          tabBarIcon: ({ focused }) => <CircleIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="deals"
        options={{
          title: 'Deals',
          tabBarIcon: ({ focused }) => <TagIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <PersonIcon focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E5E5EA',
    borderTopWidth: StyleSheet.hairlineWidth,
    height: 84,
    paddingBottom: 28,
    paddingTop: 10,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  circleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  circleIconFilled: {
    backgroundColor: '#000000',
  },
  circleIconOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#8E8E93',
  },
  tagWrapper: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagBody: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    backgroundColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  tagDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    top: 4,
    right: 4,
  },
  personWrapper: {
    width: 24,
    height: 24,
    alignItems: 'center',
  },
  personHead: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    backgroundColor: 'transparent',
    marginTop: 1,
  },
  personBody: {
    width: 20,
    height: 9,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 2,
    borderBottomWidth: 0,
    backgroundColor: 'transparent',
    marginTop: 1,
  },
});
