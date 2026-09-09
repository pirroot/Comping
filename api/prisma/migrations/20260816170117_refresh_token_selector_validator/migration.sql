/*
  Warnings:

  - You are about to drop the column `token` on the `RefreshToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[selector]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `selector` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validator` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "RefreshToken_token_key";

-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "token",
ADD COLUMN     "selector" TEXT NOT NULL,
ADD COLUMN     "validator" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "family" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_selector_key" ON "RefreshToken"("selector");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");
