-- AlterTable
ALTER TABLE `users` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `deletedAt` DATETIME(3) NULL;
