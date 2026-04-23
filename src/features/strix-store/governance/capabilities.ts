export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export type Capability = {
  id: string;
  name: string;
  description: string;
  risk: RiskLevel;
  blastRadius: string;
};

export const CAPABILITIES: Record<string, Capability> = {
  'orders.read': {
    id: 'orders.read',
    name: 'Read orders',
    description: 'List and view individual orders.',
    risk: 'low',
    blastRadius: 'read-only',
  },
  'orders.create': {
    id: 'orders.create',
    name: 'Create order',
    description: 'A customer checks out with items in their cart.',
    risk: 'low',
    blastRadius: 'one new order, one payment authorization',
  },
  'orders.refund.single': {
    id: 'orders.refund.single',
    name: 'Refund a single order',
    description: 'Issue a refund against one order, subject to amount caps.',
    risk: 'moderate',
    blastRadius: 'one order, one customer',
  },
  'orders.refund.bulk': {
    id: 'orders.refund.bulk',
    name: 'Refund orders in bulk',
    description: 'Issue refunds across many orders in a single action.',
    risk: 'critical',
    blastRadius: 'all orders in scope + payment processor',
  },
  'products.price.update': {
    id: 'products.price.update',
    name: 'Update product price',
    description: 'Change the listed price of a product.',
    risk: 'high',
    blastRadius: 'storefront revenue, active carts',
  },
  'products.price.bulk_update': {
    id: 'products.price.bulk_update',
    name: 'Bulk price update',
    description: 'Change prices across many products at once.',
    risk: 'critical',
    blastRadius: 'entire catalog + downstream invoices',
  },
  'inventory.adjust': {
    id: 'inventory.adjust',
    name: 'Adjust inventory',
    description: 'Add or remove stock for a SKU.',
    risk: 'moderate',
    blastRadius: 'warehouse counts, fulfillment',
  },
  'inventory.wipe': {
    id: 'inventory.wipe',
    name: 'Zero all inventory',
    description: 'Destructive: set inventory to zero across the catalog.',
    risk: 'critical',
    blastRadius: 'entire catalog, listings go out of stock immediately',
  },
  'users.role.grant_admin': {
    id: 'users.role.grant_admin',
    name: 'Grant admin role',
    description: 'Promote a user to admin, giving full control of the store.',
    risk: 'critical',
    blastRadius: 'every governed capability, every record',
  },
  'customers.export_pii': {
    id: 'customers.export_pii',
    name: 'Export customer PII',
    description: 'Download names, emails, and order history for customers.',
    risk: 'critical',
    blastRadius: 'all customers, GDPR/CCPA exposure',
  },
};
