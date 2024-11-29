/*
  Warnings:

  - Added the required column `budget` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Budget" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "budget" INTEGER NOT NULL
);
INSERT INTO "new_Budget" ("uid") SELECT "uid" FROM "Budget";
DROP TABLE "Budget";
ALTER TABLE "new_Budget" RENAME TO "Budget";
CREATE UNIQUE INDEX "Budget_uid_key" ON "Budget"("uid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
