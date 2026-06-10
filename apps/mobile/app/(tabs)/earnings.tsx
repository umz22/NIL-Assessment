import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { EarningsCard } from '@/components/EarningsCard';
import { DealRow } from '@/components/DealRow';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import type { DealStatus } from '@/components/StatusBadge';

// ---------- types ----------

interface DealSummary {
  id: string;
  brand: string;
  brandAbbr: string;
  brandColor: string;
  status: DealStatus;
  paymentsCompleted: number;
  paymentsTotal: number;
  totalCents: number;
}

interface EarningsSummary {
  athleteName: string;
  sport: string;
  university: string;
  totalCents: number;
  paidCents: number;
  pendingCents: number;
  activeDeals: DealSummary[];
}

// ---------- placeholder data (replaced when API is wired) ----------

const PLACEHOLDER: EarningsSummary = {
  athleteName: 'Marcus Johnson',
  sport: 'Basketball',
  university: 'Duke University',
  totalCents: 1_500_000,
  paidCents: 1_000_000,
  pendingCents: 500_000,
  activeDeals: [
    {
      id: '1',
      brand: 'Nike',
      brandAbbr: 'NIKE',
      brandColor: '#000000',
      status: 'active',
      paymentsCompleted: 2,
      paymentsTotal: 3,
      totalCents: 1_500_000,
    },
    {
      id: '2',
      brand: 'Gatorade',
      brandAbbr: 'GTR',
      brandColor: '#FF6B00',
      status: 'pending',
      paymentsCompleted: 0,
      paymentsTotal: 2,
      totalCents: 800_000,
    },
    {
      id: '3',
      brand: 'EA Sports',
      brandAbbr: 'EA',
      brandColor: '#E31E24',
      status: 'completed',
      paymentsCompleted: 4,
      paymentsTotal: 4,
      totalCents: 650_000,
    },
  ],
};

// ---------- screen ----------

export default function EarningsScreen() {
  const insets = useSafeAreaInsets();

  const { data, isLoading, isError, error, refetch, isRefetching } =
    useQuery<EarningsSummary>({
      queryKey: ['earnings'],
      queryFn: () => api.get<EarningsSummary>('/api/earnings'),
      // Fall back to placeholder while API is not available
      placeholderData: PLACEHOLDER,
    });

  if (isLoading && !data) return <LoadingState />;
  if (isError && !data)
    return (
      <ErrorState
        message={(error as Error)?.message}
        onRetry={() => void refetch()}
      />
    );

  const summary = data ?? PLACEHOLDER;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 20 },
      ]}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={() => void refetch()}
          tintColor="#000000"
        />
      }
    >
      {/* ── Header ─────────────────────────────── */}
      <View style={styles.header}>
        <Text style={styles.welcomeLabel}>Welcome back</Text>
        <Text style={styles.athleteName}>{summary.athleteName}</Text>
        <Text style={styles.athleteMeta}>
          {summary.sport} · {summary.university}
        </Text>
      </View>

      {/* ── Total Earnings Card ─────────────────── */}
      <View style={styles.cardSpacing}>
        <EarningsCard
          totalCents={summary.totalCents}
          paidCents={summary.paidCents}
          pendingCents={summary.pendingCents}
        />
      </View>

      {/* ── Active Deals ───────────────────────── */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Deals</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>
              {summary.activeDeals.length}
            </Text>
          </View>
        </View>

        {summary.activeDeals.map((deal) => (
          <DealRow
            key={deal.id}
            brand={deal.brand}
            brandAbbr={deal.brandAbbr}
            brandColor={deal.brandColor}
            status={deal.status}
            paymentsCompleted={deal.paymentsCompleted}
            paymentsTotal={deal.paymentsTotal}
            totalCents={deal.totalCents}
          />
        ))}
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
    paddingBottom: 32,
  },

  // header
  header: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  welcomeLabel: {
    fontSize: 14,
    color: '#636366',
    marginBottom: 2,
  },
  athleteName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 4,
  },
  athleteMeta: {
    fontSize: 14,
    color: '#636366',
  },

  // spacing
  cardSpacing: {
    marginBottom: 28,
  },

  // deals section
  section: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    flex: 1,
  },
  countBadge: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    minWidth: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  countBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
