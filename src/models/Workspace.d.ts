import mongoose, { Document } from "mongoose";
export interface IWorkspace extends Document {
    title: string;
    shortDescription?: string;
    description: string;
    price: number;
    location: string;
    city: string;
    image: string;
    gallery: string[];
    amenities: string[];
    user: mongoose.Schema.Types.ObjectId;
}
declare const Workspace: mongoose.Model<IWorkspace, {}, {}, {}, Document<unknown, {}, IWorkspace, {}, mongoose.DefaultSchemaOptions> & IWorkspace & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IWorkspace>;
export default Workspace;
//# sourceMappingURL=Workspace.d.ts.map