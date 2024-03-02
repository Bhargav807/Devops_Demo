import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import farmerLotRequestModel from "../models/farmerLotRequestModel.js";
import JWT from "jsonwebtoken";
export const registerController = async(req,res)=>{
    try
    {
        const {name,email,password,phone,address,answer} = req.body;
        //validations
        if(!name){
            return res.send({message:'Name is Required'})
        }
        if(!email){
            return res.send({message:'Email is Required'})
        }
        if(!password){
            return res.send({message:'Password is Required'})
        }
        if(!phone){
            return res.send({message:'Phone is Required'})
        }
        if(!address){
            return res.send({message:'Address is Required'})
        }
        if(!answer){
            return res.send({message:'Answer is Required'})
        }

        //check user 
        const existinguser = await userModel.findOne({email})
        //existing user
        if(existinguser){
            return res.status(200).send({
                success:false,
                message:"Already Register please login",
            })
        }
        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password:hashedPassword,
            answer
        }).save();
        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user: user,
        });
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error in Registration',
            error
        })
    }
};

//POST LOGIN
export const loginController = async(req,res)=>{
    try
    {
        const {email,password} = req.body
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message: "Invalid email or password",
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                succes:false,
                message:"Email is not registered"
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                succes:false,
                message:"Invalid Password"
            })
        }
        //token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d",
        });
        res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                _id: user._id,
                name: user.name,
                email:  user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    }
    catch(error)
    {
        console.log(error)
        res.status(500).esnd({
            success:fase,
            message:'Error in login',
            error
        })
    }
};

//forgotPasswordController

export const forgotPasswordController = async(req, res) => {
    try{
        const {email,answer,newPassword} = req.body
        if(!email){
            res.status(400).send({message:'Email is required'})
        }
        if(!answer){
            res.status(400).send({message:'answer is required'})
        }
        if(!newPassword){
            res.status(400).send({message:'New Password is required'})
        }
        //check 
        const user = await userModel.findOne({email,answer});
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Wrong Email Or Answer",
            });
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password:hashed});
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something went wrong",
            error
        })
    }
};

//test controller
export const testController = (req,res) => {
    res.send("protected Route");
};

//farmer lot request 
export const farmerLotRequest = async(req,res) => {
    try {
        const {
            farmer_lot_request_id,
            actual_price,
            actual_price_uom,
            actual_qty,
            actual_qty_uom,
            actual_yield_date,
            available_location_lat,
            available_location_lon,
            available_lot_indicator,
            commodity_id,
            created_at,
            created_user_id,
            expected_price,
            expected_price_uom,
            expected_qty,
            expected_qty_uom,
            expected_yield_date,
            farmer_agent_id,
            farmer_id,
            location_desc,
            merge_indicator,
            net_actual_price,
            net_expected_price,
            notes,
            no_of_packages,
            organic,
            packaging_type,
            parent_lot_indicator,
            parent_lot_request_id,
            per_package_qty,
            per_package_uom,
            split_indicator,
            status,
            updated_at,
            updated_user_id,
            variety,
            freight_details,
            commodity_category_id
        } = req.body;

        // Create a new farmer lot request instance
        const newFarmerLotRequest = new farmerLotRequestModel({
            farmer_lot_request_id,
            actual_price,
            actual_price_uom,
            actual_qty,
            actual_qty_uom,
            actual_yield_date,
            available_location_lat,
            available_location_lon,
            available_lot_indicator,
            commodity_id,
            created_at,
            created_user_id,
            expected_price,
            expected_price_uom,
            expected_qty,
            expected_qty_uom,
            expected_yield_date,
            farmer_agent_id,
            farmer_id,
            location_desc,
            merge_indicator,
            net_actual_price,
            net_expected_price,
            notes,
            no_of_packages,
            organic,
            packaging_type,
            parent_lot_indicator,
            parent_lot_request_id,
            per_package_qty,
            per_package_uom,
            split_indicator,
            status,
            updated_at,
            updated_user_id,
            variety,
            freight_details,
            commodity_category_id
        });

        // Save the new farmer lot request to the database
        const far =  await newFarmerLotRequest.save();

        res.status(201).send({
            success: true,
            message: 'Farmer lot request created successfully',
            data: newFarmerLotRequest
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in creating farmer lot request',
            error: error.message
        });
    }
};