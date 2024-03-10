/*
  Warnings:

  - You are about to drop the column `userId` on the `ShiftAssignment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ShiftAssignment" DROP CONSTRAINT "ShiftAssignment_userId_fkey";

-- AlterTable
ALTER TABLE "Shift" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "ShiftAssignment" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
