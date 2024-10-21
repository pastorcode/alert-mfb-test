/*
  Warnings:

  - You are about to alter the column `permissions` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Json`.

*/
-- AlterTable
ALTER TABLE `roles` MODIFY `permissions` JSON NOT NULL;
