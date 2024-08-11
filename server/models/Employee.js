import { Schema,model } from "mongoose";

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},{
    timestamps: true,   
});

const Employee = model("Employee", EmployeeSchema);

export default Employee;