-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,
    "userMail" TEXT NOT NULL,
    "isGoogle" BOOLEAN NOT NULL,
    "googleId" TEXT NOT NULL,
    "avatar" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" TEXT NOT NULL,
    "userEMail" TEXT NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userMail_key" ON "User"("userMail");

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_userEMail_fkey" FOREIGN KEY ("userEMail") REFERENCES "User"("userMail") ON DELETE RESTRICT ON UPDATE CASCADE;
