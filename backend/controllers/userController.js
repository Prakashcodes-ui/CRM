import bcrypt from "bcryptjs";
import User from "../models/User.js";
import userServices from "../services/userServices.js"

// USERS CREATED
export const createUsers = async (req, res) => {
  try {
    const { name, email, password, phone, role, status } = req.body;

    if (!name || !email || !password || !phone || !role || !status) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      status,
    });

    return res.status(201).json({
      message: `${role} created successfully`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};


export const getAllUsers = async(req, res) => {
  try{
    const user =await userServices.getAllUsers();

    res.json({
      message:"All users fecth successfully",
      user
    })
  }catch(error){
    res.status(500).json({
      error:error.message
    })
  }
}

export const getSingleUsers = async(req, res) => {
  try{
    const user =await userServices.getSingleUsers(req.params.id);
    
    if(!user) return res.status(404).json({message:"User not found"})
    res.json({
      message:"user fecth successfully",
      user
    })
  }catch(error){
    res.status(500).json({
      error:error.message
    })
  }
}

export const updateUsers = async(req, res) => {
  try{
    const user =await userServices.updateUsers(req.params.id, req.body);
    if(!user) return res.status(404).json({message:"User not found"})
    res.json({
      message:"User updated successfully",
      user
    })
  }catch(error){
    res.status(500).json({
      error:error.message
    })
  }
}

export const userDeleted = async(req, res) => {
  try{
    const user =await userServices.userDeleted(req.params.id);
    if(!user) return res.status(404).json({message:"User not found"})
    res.json({
      message:"user deleted successfully",
      user
    })
  }catch(error){
    res.status(500).json({
      error:error.message
    })
  }
}

export const permanentDelete = async(req, res) => {
  try{
    const user =await userServices.permanentDelete(req.params.id);
    
    if(!user) return res.status(404).json({message:"User not found"})
    res.json({
      message:"user permanent deleted successfully",
      user
    })
  }catch(error){
    res.status(500).json({
      error:error.message
    })
  }
}