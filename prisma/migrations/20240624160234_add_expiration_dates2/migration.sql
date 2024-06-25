/*
  Warnings:

  - Made the column `exp_email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "email2" TEXT,
    "email3" TEXT,
    "email4" TEXT,
    "exp_email" DATETIME NOT NULL,
    "exp_email2" DATETIME,
    "exp_email3" DATETIME,
    "exp_email4" DATETIME,
    "password" TEXT NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "line_id" TEXT,
    "tel" TEXT,
    "status" TEXT NOT NULL DEFAULT '1'
);
INSERT INTO "new_User" ("email", "email2", "email3", "email4", "exp_email", "exp_email2", "exp_email3", "exp_email4", "fname", "id", "line_id", "lname", "password", "status", "tel") SELECT "email", "email2", "email3", "email4", "exp_email", "exp_email2", "exp_email3", "exp_email4", "fname", "id", "line_id", "lname", "password", "status", "tel" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_email2_key" ON "User"("email2");
CREATE UNIQUE INDEX "User_email3_key" ON "User"("email3");
CREATE UNIQUE INDEX "User_email4_key" ON "User"("email4");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
