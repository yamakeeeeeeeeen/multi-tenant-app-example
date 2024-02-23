/*
  Warnings:

  - The primary key for the `Tenants` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `name` on the `Tenants` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `subdomain` on the `Tenants` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - Added the required column `updatedAt` to the `Tenants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tenants" DROP CONSTRAINT "Tenants_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "subdomain" SET DATA TYPE VARCHAR(30),
ADD CONSTRAINT "Tenants_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Tenants_id_seq";
