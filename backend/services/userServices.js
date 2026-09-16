import User from '../models/User.js';
import { Op } from 'sequelize';

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

const userProfile = async (req) => {
    const id = req.user.id;

    const user = await User.findOne({
        where:{id},
        attributes:{
                exclude: ["password", "createdAt", "updatedAt"]
        }
    });
    return user;
}
export default {getAllUsers,getSingleUsers, updateUsers, userDeleted, permanentDelete, userProfile};

