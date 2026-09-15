import User from '../models/User.js';
import { Op, where } from 'sequelize';

const getAllUsers =async (req) => {
    const role = req.user.role;
    let whereContition = {};

    if(role === "SUPER_ADMIN"){
        whereContition = {
            role:{
                [Op.ne] :"SUPER_ADMIN"
            }
        };
    }else if(role === "ADMIN"){
        whereContition = {
            role:{
                [Op.notIn] :["SUPER_ADMIN", "ADMIN"]
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

const getSingleUsers =async (id) => {
    const user = await User.findOne({
        where:{
            id,
            role:{
                [Op.ne] :"SUPER_ADMIN"
            }
        },
        attributes:{
            exclude:["password"]
        }
    });

    if(!user) return null;
    return user
};

const updateUsers = async(id,data) => {
    const user = await User.findOne({
        where:{
            id,
            role:{
                [Op.ne] :"SUPER_ADMIN"
            }
        },
        attributes:{
            exclude:["password"]
        }
    });

    if(!user) return null;

    const users = await user.update(data)
    return users
};

const userDeleted = async(id) => {
    const user = await User.findOne({
        where:{
            id,
            role:{
                [Op.ne] :"SUPER_ADMIN"
            }
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
export default {getAllUsers,getSingleUsers, updateUsers, userDeleted, permanentDelete};

