import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DealsScreen() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 20 }]}
    >
      <Text style={styles.heading}>Deals</Text>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Your deals will appear here.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#F2F1ED',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 24,
  },
  placeholder: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 15,
    color: '#8E8E93',
  },
});
