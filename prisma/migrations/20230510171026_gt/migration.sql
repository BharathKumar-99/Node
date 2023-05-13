-- DropForeignKey
ALTER TABLE "ContentList" DROP CONSTRAINT "ContentList_contentTypeId_fkey";

-- AlterTable
ALTER TABLE "ContentList" ALTER COLUMN "contentTypeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ContentList" ADD CONSTRAINT "ContentList_contentTypeId_fkey" FOREIGN KEY ("contentTypeId") REFERENCES "ContentType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
