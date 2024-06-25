/*
  Warnings:

  - You are about to drop the column `action` on the `Signal` table. All the data in the column will be lost.
  - You are about to drop the column `pair` on the `Signal` table. All the data in the column will be lost.
  - Added the required column `Alert` to the `Signal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Signal` to the `Signal` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Signal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Alert" TEXT NOT NULL,
    "Signal" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Signal" ("createdAt", "id") SELECT "createdAt", "id" FROM "Signal";
DROP TABLE "Signal";
ALTER TABLE "new_Signal" RENAME TO "Signal";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
