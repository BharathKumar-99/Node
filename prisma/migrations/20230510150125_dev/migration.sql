/*
  Warnings:

  - You are about to drop the column `contentListId` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `contentId` on the `Courses` table. All the data in the column will be lost.
  - Added the required column `contentId` to the `ContentList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isFree` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_contentListId_fkey";

-- DropForeignKey
ALTER TABLE "Courses" DROP CONSTRAINT "Courses_contentId_fkey";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "contentListId";

-- AlterTable
ALTER TABLE "ContentList" ADD COLUMN     "contentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "contentId",
ADD COLUMN     "isFree" BOOLEAN NOT NULL,
ADD COLUMN     "price" TEXT;

-- CreateTable
CREATE TABLE "_ContentToCourses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ContentToCourses_AB_unique" ON "_ContentToCourses"("A", "B");

-- CreateIndex
CREATE INDEX "_ContentToCourses_B_index" ON "_ContentToCourses"("B");

-- AddForeignKey
ALTER TABLE "ContentList" ADD CONSTRAINT "ContentList_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentToCourses" ADD CONSTRAINT "_ContentToCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentToCourses" ADD CONSTRAINT "_ContentToCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
