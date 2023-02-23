-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "result" TEXT NOT NULL DEFAULT 'pending',
    "methodId" TEXT NOT NULL,
    CONSTRAINT "Tip_methodId_fkey" FOREIGN KEY ("methodId") REFERENCES "Method" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tip" ("date", "description", "id", "methodId", "result") SELECT "date", "description", "id", "methodId", "result" FROM "Tip";
DROP TABLE "Tip";
ALTER TABLE "new_Tip" RENAME TO "Tip";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
