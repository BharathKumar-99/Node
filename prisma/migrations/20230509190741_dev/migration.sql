/*
  Warnings:

  - You are about to drop the column `informationId` on the `User` table. All the data in the column will be lost.
  - Added the required column `contentId` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_informationId_fkey";

-- AlterTable
ALTER TABLE "Courses" ADD COLUMN     "contentId" INTEGER NOT NULL,
ADD COLUMN     "videoIntro" TEXT,
ALTER COLUMN "soldCount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "informationId";

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contentListId" INTEGER NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contentTypeId" INTEGER NOT NULL,
    "downloadable" BOOLEAN NOT NULL,
    "description" TEXT,
    "video" TEXT,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read" BOOLEAN,

    CONSTRAINT "ContentList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "ContentType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_contentListId_fkey" FOREIGN KEY ("contentListId") REFERENCES "ContentList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentList" ADD CONSTRAINT "ContentList_contentTypeId_fkey" FOREIGN KEY ("contentTypeId") REFERENCES "ContentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
