-- CreateTable
CREATE TABLE "DatabaseMetadata" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "containerCapacity" INTEGER,
    "totalMessages" INTEGER NOT NULL DEFAULT 0,
    "isInitialized" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DatabaseMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Container" (
    "id" SERIAL NOT NULL,
    "databaseId" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "currentCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Container_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR(10) NOT NULL,
    "containerId" INTEGER NOT NULL,
    "databaseId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Message_content_databaseId_key" ON "Message"("content", "databaseId");

-- AddForeignKey
ALTER TABLE "Container" ADD CONSTRAINT "Container_databaseId_fkey" FOREIGN KEY ("databaseId") REFERENCES "DatabaseMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_containerId_fkey" FOREIGN KEY ("containerId") REFERENCES "Container"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_databaseId_fkey" FOREIGN KEY ("databaseId") REFERENCES "DatabaseMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
