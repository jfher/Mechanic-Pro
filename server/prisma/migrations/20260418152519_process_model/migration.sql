/*
  Warnings:

  - You are about to drop the `Admission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Retirement` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ProcessType" AS ENUM ('ADMISSION', 'RETIREMENT');

-- DropForeignKey
ALTER TABLE "Admission" DROP CONSTRAINT "Admission_operatorId_fkey";

-- DropForeignKey
ALTER TABLE "Admission" DROP CONSTRAINT "Admission_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "Retirement" DROP CONSTRAINT "Retirement_operatorId_fkey";

-- DropForeignKey
ALTER TABLE "Retirement" DROP CONSTRAINT "Retirement_vehicleId_fkey";

-- DropTable
DROP TABLE "Admission";

-- DropTable
DROP TABLE "Retirement";

-- CreateTable
CREATE TABLE "Process" (
    "id" UUID NOT NULL,
    "vehicleId" UUID NOT NULL,
    "operatorId" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "ProcessType" NOT NULL DEFAULT 'ADMISSION',

    CONSTRAINT "Process_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
