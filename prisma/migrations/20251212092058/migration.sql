/*
  Warnings:

  - You are about to drop the column `role` on the `refresh_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `refresh_tokens` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `refresh_tokens` DROP COLUMN `role`,
    DROP COLUMN `username`,
    ADD COLUMN `isBan` BOOLEAN NOT NULL DEFAULT false;
