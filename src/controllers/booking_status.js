import dayjs from "dayjs";
import { Booking as roomBooking } from "../database/models/index";
import { onError, onSuccess } from "../utils/response";

export default class BookingStatus {
  static async changeStatus(req, res) {
    const { status } = req.params;
    const { booking } = req;
    const dateAfter = dayjs(booking.createdAt)
      .add(10, "day");
    const currentDate = dayjs(new Date());
    if (dateAfter.isBefore(currentDate)) return onError(res, 400, "You can't change the status because it expired 10!");

    switch (status) {
      case "approve": {
        if (booking.status === "approved") return onError(res, 400, "Already approved");
        if (booking.status === "rejected") {
          const isApprovalExpired = dayjs(booking.status_updated_at)
            .add(2, "day")
            .isBefore(new Date());
          if (isApprovalExpired) return onError(res, 400, "You can't approve the rejected status after 2 days");
        }
        booking.status = "approved";
        break;
      }
      case "reject": {
        if (booking.status === "rejected") return onError(res, 400, "Already rejected");
        if (booking.status === "approved") {
          const isRejectExpired = dayjs(booking.status_updated_at)
            .add(2, "day")
            .isBefore(new Date());
          if (isRejectExpired) return onError(res, 400, "You can't reject the approved booking after 2 days");
        }
        booking.status = "rejected";
        break;
      }
      default:
        return onError(res, 400, "Invalid status");
    }
    await roomBooking.update({
      status: booking.status,
      status_updated_at: Date.now()
    }, { where: { id: booking.id } });
    return onSuccess(res, 200, "Booking status updated successfully!", booking);
  }
}
