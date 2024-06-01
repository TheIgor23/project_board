-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT NOT NULL DEFAULT '',
    "list_id" TEXT NOT NULL,
    CONSTRAINT "card_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "list" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_card" ("created_at", "description", "id", "isActive", "list_id", "name", "position", "updated_at") SELECT "created_at", "description", "id", "isActive", "list_id", "name", "position", "updated_at" FROM "card";
DROP TABLE "card";
ALTER TABLE "new_card" RENAME TO "card";
PRAGMA foreign_key_check("card");
PRAGMA foreign_keys=ON;
