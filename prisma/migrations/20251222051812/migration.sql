/*
  Warnings:

  - You are about to drop the column `create_by` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `externalId` on the `organization` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Organization_externalId_key` ON `organization`;

-- AlterTable
ALTER TABLE `organization` DROP COLUMN `create_by`,
    DROP COLUMN `externalId`;
