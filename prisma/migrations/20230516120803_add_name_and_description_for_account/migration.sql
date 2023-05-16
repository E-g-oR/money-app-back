/*
  Warnings:

  - You are about to drop the column `name` on the `operations` table. All the data in the column will be lost.
  - Added the required column `name` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `operations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "operations" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;
