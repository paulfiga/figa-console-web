/*
  Warnings:

  - You are about to drop the column `name` on the `DataSource` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,userId,provider]` on the table `DataSource` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `provider` on the `DataSource` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('GoogleDrive', 'MSDrive');

-- CreateEnum
CREATE TYPE "EmbedStatus" AS ENUM ('New', 'Embedding', 'Done');

-- AlterTable
ALTER TABLE "DataSource" DROP COLUMN "name",
ADD COLUMN     "status" "EmbedStatus" NOT NULL DEFAULT 'New',
DROP COLUMN "provider",
ADD COLUMN     "provider" "Provider" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "DataSource_id_userId_provider_key" ON "DataSource"("id", "userId", "provider");
