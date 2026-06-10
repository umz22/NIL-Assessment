import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BrandLogo } from './BrandLogo';
import { StatusBadge, type DealStatus } from './StatusBadge';
import { formatCents } from '../lib/format';

export interface DealRowProps {
  brand: string;
  brandAbbr: string;
  brandColor: string;
  status: DealStatus;
  paymentsCompleted: number;
  paymentsTotal: number;
  totalCents: number;
  onPress?: () => void;
}

export function DealRow({
  brand,
  brandAbbr,
  brandColor,
  status,
  paymentsCompleted,
  paymentsTotal,
  totalCents,
  onPress,
}: DealRowProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <BrandLogo abbr={brandAbbr} bgColor={brandColor} />
      <View style={styles.info}>
        <Text style={styles.brand}>{brand}</Text>
        <StatusBadge
          status={status}
          paymentsCompleted={paymentsCompleted}
          paymentsTotal={paymentsTotal}
        />
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>{formatCents(totalCents)}</Text>
        <Text style={styles.chevron}>›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  pressed: {
    opacity: 0.7,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  brand: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 3,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  chevron: {
    fontSize: 20,
    color: '#C7C7CC',
    lineHeight: 22,
  },
});
