-- CreateEnum
CREATE TYPE "SettingType" AS ENUM ('Embed', 'Query');

-- CreateTable
CREATE TABLE "Setting" (
    "userId" TEXT NOT NULL,
    "type" "SettingType" NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("userId","type")
);

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
