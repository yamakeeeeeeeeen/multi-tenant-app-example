-- DropForeignKey
ALTER TABLE "Shift" DROP CONSTRAINT "Shift_reservationId_fkey";

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
