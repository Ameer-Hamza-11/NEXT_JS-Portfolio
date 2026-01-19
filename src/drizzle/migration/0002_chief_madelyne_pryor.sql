ALTER TABLE `posts` ADD `excerpt` varchar(300);--> statement-breakpoint
ALTER TABLE `posts` ADD `type` enum('blog','project') DEFAULT 'blog' NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` ADD `published_at` timestamp DEFAULT (now()) NOT NULL;