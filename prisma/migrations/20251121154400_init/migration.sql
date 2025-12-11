-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `externalId` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NULL,
    `fullName` VARCHAR(191) NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `deleteSelfEnabled` BOOLEAN NOT NULL DEFAULT true,
    `createOrganizationEnabled` BOOLEAN NOT NULL DEFAULT false,
    `createOrganizationsLimit` INTEGER NOT NULL DEFAULT 1,
    `hasVerifiedEmailAddress` BOOLEAN NOT NULL DEFAULT false,
    `hasVerifiedPhoneNumber` BOOLEAN NOT NULL DEFAULT false,
    `lastSignInAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_externalId_key`(`externalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
