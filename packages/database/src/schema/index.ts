import {
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ---------- Enums ----------

export const dealStatusEnum = pgEnum('deal_status', [
  'active',
  'pending',
  'completed',
  'cancelled',
]);

export const paymentStatusEnum = pgEnum('payment_status', [
  'paid',
  'pending',
  'failed',
]);

// ---------- Tables ----------

export const athletes = pgTable('athletes', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const deals = pgTable(
  'deals',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    athleteId: uuid('athlete_id')
      .notNull()
      .references(() => athletes.id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 255 }).notNull(),
    brandName: varchar('brand_name', { length: 255 }).notNull(),
    /** Value stored in integer cents — never floats. */
    amountCents: integer('amount_cents').notNull(),
    status: dealStatusEnum('status').notNull().default('pending'),
    startDate: date('start_date').notNull(),
    endDate: date('end_date'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('deals_athlete_id_idx').on(t.athleteId),
    index('deals_status_idx').on(t.status),
  ],
);

export const payments = pgTable(
  'payments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    athleteId: uuid('athlete_id')
      .notNull()
      .references(() => athletes.id, { onDelete: 'cascade' }),
    dealId: uuid('deal_id').references(() => deals.id, { onDelete: 'set null' }),
    /** Value stored in integer cents — never floats. */
    amountCents: integer('amount_cents').notNull(),
    status: paymentStatusEnum('status').notNull().default('pending'),
    paidAt: timestamp('paid_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('payments_athlete_id_idx').on(t.athleteId),
    index('payments_deal_id_idx').on(t.dealId),
    index('payments_status_idx').on(t.status),
  ],
);

// ---------- Relations ----------

export const athletesRelations = relations(athletes, ({ many }) => ({
  deals: many(deals),
  payments: many(payments),
}));

export const dealsRelations = relations(deals, ({ one, many }) => ({
  athlete: one(athletes, {
    fields: [deals.athleteId],
    references: [athletes.id],
  }),
  payments: many(payments),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  athlete: one(athletes, {
    fields: [payments.athleteId],
    references: [athletes.id],
  }),
  deal: one(deals, {
    fields: [payments.dealId],
    references: [deals.id],
  }),
}));

// ---------- TypeScript types ----------

export type Athlete = typeof athletes.$inferSelect;
export type NewAthlete = typeof athletes.$inferInsert;

export type Deal = typeof deals.$inferSelect;
export type NewDeal = typeof deals.$inferInsert;

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;

export type DealStatus = (typeof dealStatusEnum.enumValues)[number];
export type PaymentStatus = (typeof paymentStatusEnum.enumValues)[number];
