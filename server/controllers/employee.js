import Employee from "../models/Employee.js";
import User from "../models/User.js";

const postEmployee = async(req, res)=>{
    const {name, age,  address, phone, email, branch, photo, user} = req.body;

    const employee = new Employee({
        name,
        age,
        address,
        phone,
        email,
        branch,
        photo, 
        user
    });

    try{
        const savedEmployee = await employee.save();

        res.json({
            success:true,
            message: "Employee added successfully",
            employee: savedEmployee
        })
    }
    catch(e){
        res.json({
            success: false,
            message: e.message,
            data: null
        })
    }
}

const getEmployees = async(req, res)=>{
    const {userId} = req.query;

    const user = await User.findById(userId)

    if(!user){
        return res.json({
            success: false,
            message: "User not found",
            data: null
        })
    }

    const employees = await Employee.find({user:userId}).sort({createdAt:-1});

    res.json({
        success: true,
        message: "Employees fetched successfully",
        data: employees
    })
}

const deleteEmployee = async(req, res)=>{
    const {id} = req.params;

    await Employee.deleteOne({_id:id});

    res.json({
        success: true,
        message: "Employee deleted successfully",
        data: null
    })
}


export {
    postEmployee,
    getEmployees,
    deleteEmployee
}