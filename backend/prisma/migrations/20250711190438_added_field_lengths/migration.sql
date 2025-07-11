/*
  Warnings:

  - You are about to alter the column `name` on the `device` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `type` on the `device` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `location` on the `device` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `username` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(15)`.

*/
-- AlterTable
ALTER TABLE `device` MODIFY `name` VARCHAR(30) NOT NULL,
    MODIFY `type` VARCHAR(20) NOT NULL,
    MODIFY `location` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `username` VARCHAR(30) NOT NULL,
    MODIFY `password` VARCHAR(15) NOT NULL;
