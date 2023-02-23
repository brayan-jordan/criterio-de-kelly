-- CreateTable
CREATE TABLE "Method" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "result" TEXT NOT NULL,
    "methodId" TEXT NOT NULL,
    CONSTRAINT "Tip_methodId_fkey" FOREIGN KEY ("methodId") REFERENCES "Method" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
