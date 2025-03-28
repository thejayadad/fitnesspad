/*
  Warnings:

  - Added the required column `note` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "note" TEXT NOT NULL;
