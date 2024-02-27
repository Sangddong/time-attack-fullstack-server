-- AlterTable
ALTER TABLE "Deals" ADD COLUMN     "likes" INTEGER,
ADD COLUMN     "views" INTEGER;

-- CreateTable
CREATE TABLE "LikeDeals" (
    "userId" TEXT NOT NULL,
    "dealId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "LikeDeals_userId_dealId_key" ON "LikeDeals"("userId", "dealId");

-- AddForeignKey
ALTER TABLE "LikeDeals" ADD CONSTRAINT "LikeDeals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
