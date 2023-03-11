-- CreateEnum
CREATE TYPE "AvatarType" AS ENUM ('SVG', 'GOOGLE_URL');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatype" "AvatarType" NOT NULL DEFAULT 'SVG';
