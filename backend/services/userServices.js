import User from '../models/User.js';
import { Op } from 'sequelize';
import bcrypt from "bcryptjs";

const getAllUsers =async (req) => {
    const role = req.user.role;
    let whereContition = {};

    if(role === "SUPER_ADMIN"){
        whereContition = {
            role:{
                [Op.ne] :""
            }
        };
    }else if(role === "ADMIN"){
        whereContition = {
            role:{
                [Op.notIn] :["SUPER_ADMIN"]
            }
        };
    }else if(role === "MANAGER"){
        whereContition = {
            role:{
                [Op.notIn] :["SUPER_ADMIN", "ADMIN"]
            }
        };
    }else if(role === "TL"){
        whereContition = {
            role:{
                [Op.notIn] :["SUPER_ADMIN", "ADMIN", "MANAGER"]
            }
        };
    }else if(role === "STAFF"){
        whereContition = {
            role:{
                [Op.notIn] : ["SUPER_ADMIN", "ADMIN", "MANAGER", "TL"]
            }
        };
    }

    const user = await User.findAll({
        where:whereContition,
        attributes:{
            exclude:["password"]
        }
    });
    return user
};

const getSingleUsers =async (req) => {
    const id = req.params.id;
    const role = req.user.role;
    let whereContition = {};
    if(role === "SUPER_ADMIN"){
        whereContition = { id };
    }else if(role === "ADMIN"){
        whereContition = {
            id,
            role:{
                [Op.notIn] : ["SUPER_ADMIN"]
            }
        };
    }else if(role === "MANAGER"){
        whereContition = {
            id,
            role:{
                [Op.notIn] : ["SUPER_ADMIN", "ADMIN"]
            }
        };
    }else if(role === "TL"){
        whereContition = {
            id,
            role:{
                [Op.notIn] : ["SUPER_ADMIN", "ADMIN", "MANAGER"]
            }
        };
    }

    const user = await User.findOne({
        where:whereContition,
        attributes:{
                exclude:["password"]
        }
    })

    if(!user) return null;
    return user
};

const updateUsers = async(id,data,req) => {
    const role = req.user.role;
    let whereContition = {};

    if(role === "SUPER_ADMIN"){
        whereContition = { id };
    }else if(role === "ADMIN"){
        whereContition = {
            id,
            role:{
                [Op.notIn] : ["SUPER_ADMIN"]
            }
        };
    }else if(role === "MANAGER"){
        whereContition = {
            id,
            role:{
                [Op.notIn] : ["SUPER_ADMIN", "ADMIN"]
            }
        };
    }else if(role === "TL"){
        whereContition = {
            id,
            role:{
                [Op.notIn] : ["SUPER_ADMIN", "ADMIN", "MANAGER"]
            }
        };
    }

    const user = await User.findOne({
        where:whereContition,
        attributes:{
                exclude:["password"]
        }
    })

    if(!user) return null;

    const users = await user.update(data)
    return users
};

const userDeleted = async(id, req) => {
    const role = req.user.role;
    let whereContition = {}
    if(role === "SUPER_ADMIN"){
        whereContition = { 
            id,
            role:{
                [Op.ne] :"SUPER_ADMIN"
            }
        };
    }else if(role === "ADMIN"){
        whereContition = {
            id,
            role:{
                [Op.notIn] : ["SUPER_ADMIN","ADMIN"]
            }
        };
    }else if(role === "MANAGER"){
        whereContition = {
            id,
            role:{
                [Op.notIn] : ["SUPER_ADMIN", "ADMIN","MANAGER"]
            }
        };
    }
    const user = await User.findOne({
        where:whereContition,
        attributes:{
                exclude:["password"]
        }
    });
    if(!user) return null;
    const deleteuser = await user.update({
        status:"INACTIVE"
    })
    return deleteuser
};

const permanentDelete = async(id) => {
    const user = await User.findOne({
        where:{
            id,
            role:{
                [Op.ne] :"SUPER_ADMIN"
            }
        }
    });
    if(!user) return null;
    const deleteUser = await user.destroy();
    return deleteUser
}

const userProfile = async (req, data) => {
    const id = req.user.id;    
    const users = await User.findOne({
        where:{id},
        attributes:{
                exclude: ["password", "createdAt", "updatedAt"]
        }
    });
    return users;
}

const profileUpdate = async () => {
    let allowUpdate = {};
    if(data.name !== undefined){
        allowUpdate.name = data.name;
    }
    if(data.email !== undefined){
        allowUpdate.email = data.email;
    }
    if(data.phone !== undefined){
        allowUpdate.phone = data.phone;
    }
    if(data.password !== undefined){
        allowUpdate.password = await bcrypt.hash(data.password, 10);
    }

    const user = await User.findPkBy(id);

    if(!user) return null;

    await user.update(allowUpdate);
}
export default {getAllUsers,getSingleUsers, updateUsers, userDeleted, permanentDelete, userProfile};

