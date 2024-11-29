-- CreateTable
CREATE TABLE "Category" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "categoryName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Expenseitem" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "category_name" TEXT NOT NULL,
    CONSTRAINT "Expenseitem_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "Category" ("categoryName") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_uid_key" ON "Category"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Category_categoryName_key" ON "Category"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "Expenseitem_uid_key" ON "Expenseitem"("uid");
