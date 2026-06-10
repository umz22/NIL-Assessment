import { StyleSheet, Text, View } from 'react-native';

export type DealStatus = 'active' | 'pending' | 'completed';

const STATUS_COLOR: Record<DealStatus, string> = {
  active: '#007AFF',
  pending: '#FF9F0A',
  completed: '#34C759',
};

const STATUS_LABEL: Record<DealStatus, string> = {
  active: 'Active',
  pending: 'Pending',
  completed: 'Completed',
};

interface StatusBadgeProps {
  status: DealStatus;
  paymentsCompleted: number;
  paymentsTotal: number;
}

export function StatusBadge({ status, paymentsCompleted, paymentsTotal }: StatusBadgeProps) {
  const color = STATUS_COLOR[status];
  return (
    <View style={styles.row}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.statusText, { color }]}>{STATUS_LABEL[status]}</Text>
      <Text style={styles.paymentText}>
        {' · '}
        {paymentsCompleted} of {paymentsTotal} payments
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 4,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '500',
  },
  paymentText: {
    fontSize: 13,
    color: '#8E8E93',
  },
});
