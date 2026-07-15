import mongoose, { Document } from "mongoose";
export interface IBooking extends Document {
    user: mongoose.Schema.Types.ObjectId;
    workspace: mongoose.Schema.Types.ObjectId;
    date: string;
    startTime: string;
    endTime: string;
    totalPrice: number;
    status: string;
}
declare const Booking: mongoose.Model<IBooking, {}, {}, {}, Document<unknown, {}, IBooking, {}, mongoose.DefaultSchemaOptions> & IBooking & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IBooking>;
export default Booking;
//# sourceMappingURL=Booking.d.ts.map