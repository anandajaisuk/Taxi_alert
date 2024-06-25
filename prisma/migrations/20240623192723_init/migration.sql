-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "email2" TEXT,
    "email3" TEXT,
    "email4" TEXT,
    "password" TEXT NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "line_id" TEXT,
    "tel" TEXT,
    "status" TEXT NOT NULL DEFAULT '1'
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email2_key" ON "User"("email2");

-- CreateIndex
CREATE UNIQUE INDEX "User_email3_key" ON "User"("email3");

-- CreateIndex
CREATE UNIQUE INDEX "User_email4_key" ON "User"("email4");
