import { StyleSheet, Text, View } from 'react-native';
import { formatCents, formatCentsSplit } from '../lib/format';

interface EarningsCardProps {
  totalCents: number;
  paidCents: number;
  pendingCents: number;
}

export function EarningsCard({ totalCents, paidCents, pendingCents }: EarningsCardProps) {
  const paidPct = totalCents > 0 ? (paidCents / totalCents) * 100 : 0;
  const pendingPct = totalCents > 0 ? (pendingCents / totalCents) * 100 : 0;
  const { whole, decimal } = formatCentsSplit(totalCents);

  return (
    <View style={styles.card}>
      <Text style={styles.label}>TOTAL EARNINGS</Text>

      <View style={styles.amountRow}>
        <Text style={styles.dollarSign}>$</Text>
        {/* Strip the leading "$" since we render it separately */}
        <Text style={styles.amount}>{whole.replace(/^\$/, '')}</Text>
        <Text style={styles.decimal}>{decimal}</Text>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressPaid, { width: `${paidPct}%` }]} />
        <View style={[styles.progressPending, { width: `${pendingPct}%` }]} />
      </View>

      <View style={styles.legend}>
        <LegendItem color="#34C759" label="Paid" cents={paidCents} />
        <LegendItem color="#FF9F0A" label="Pending" cents={pendingCents} />
      </View>
    </View>
  );
}

function LegendItem({
  color,
  label,
  cents,
}: {
  color: string;
  label: string;
  cents: number;
}) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>
        {label}
        {'  '}
        <Text style={styles.legendAmount}>{formatCents(cents)}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8E8E93',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    marginBottom: 16,
  },
  dollarSign: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 10,
  },
  amount: {
    fontSize: 58,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 62,
  },
  decimal: {
    fontSize: 26,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.55)',
    marginTop: 10,
  },
  progressTrack: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#3A3A3C',
  },
  progressPaid: {
    height: '100%',
    backgroundColor: '#34C759',
  },
  progressPending: {
    height: '100%',
    backgroundColor: '#FF9F0A',
  },
  legend: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 13,
    color: '#8E8E93',
  },
  legendAmount: {
    color: '#AEAEB2',
    fontWeight: '500',
  },
});
