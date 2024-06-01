-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT NOT NULL,
    "list_id" TEXT NOT NULL,
    CONSTRAINT "card_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "list" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_card" ("created_at", "description", "id", "isActive", "list_id", "name", "position", "updated_at") SELECT "created_at", "description", "id", "isActive", "list_id", "name", "position", "updated_at" FROM "card";
DROP TABLE "card";
ALTER TABLE "new_card" RENAME TO "card";
CREATE TABLE "new_list" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 1,
    "project_id" TEXT NOT NULL,
    CONSTRAINT "list_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_list" ("created_at", "id", "name", "position", "project_id", "updated_at") SELECT "created_at", "id", "name", "position", "project_id", "updated_at" FROM "list";
DROP TABLE "list";
ALTER TABLE "new_list" RENAME TO "list";
PRAGMA foreign_key_check("card");
PRAGMA foreign_key_check("list");
PRAGMA foreign_keys=ON;
