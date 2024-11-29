-- CreateTable
CREATE TABLE "Budget" (
    "uid" TEXT NOT NULL PRIMARY KEY
);

-- CreateIndex
CREATE UNIQUE INDEX "Budget_uid_key" ON "Budget"("uid");
