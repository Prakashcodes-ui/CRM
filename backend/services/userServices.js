import User from '../models/User.js';
import { Op, where } from 'sequelize';

const getAllUsers =async () => {
    const user = await User.findAll({
        where:{
            role:{
                [Op.ne] :"SUPER_ADMIN"
            }
        },
        attributes:{
            exclude:["password"]
        }
    });
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
}
export default {getAllUsers, updateUsers, userDeleted};

