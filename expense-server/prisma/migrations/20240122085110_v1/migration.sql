/*
  Warnings:

  - A unique constraint covering the columns `[category_name]` on the table `Expenseitem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Expenseitem_category_name_key" ON "Expenseitem"("category_name");
