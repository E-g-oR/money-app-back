-- CreateTable
CREATE TABLE "depths" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "valueCovered" DOUBLE PRECISION NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "deadline" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "depths_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "depths" ADD CONSTRAINT "depths_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
