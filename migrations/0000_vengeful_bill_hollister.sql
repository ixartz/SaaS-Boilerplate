CREATE TABLE `organization` (
	`id` text PRIMARY KEY NOT NULL,
	`stripe_customer_id` text,
	`stripe_subscription_id` text,
	`stripe_subscription_price_id` text,
	`stripe_subscription_status` text,
	`stripe_subscription_current_period_end` integer,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE TABLE `todo` (
	`id` integer PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`title` text NOT NULL,
	`message` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `stripe_customer_id_idx` ON `organization` (`stripe_customer_id`);