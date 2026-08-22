-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "publicSummary" TEXT,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;
