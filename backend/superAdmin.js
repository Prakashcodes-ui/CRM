import bcrypt from "bcryptjs";
import User from "./models/User.js";
import sequelize from "./config/database.js";

const createAdmin = async () => {
    try {
        await sequelize.authenticate();

        const hashedPassword = await bcrypt.hash(
            "superadmin@123",
            10
        );

        const existingAdmin = await User.findOne({
            where: {
                email: "superadmin@test.com"
            }
        });

        if (existingAdmin) {
            console.log("Super admin already exists");
            return;
        }

        await User.create({
            name: "Super Admin",
            email: "superadmin@test.com",
            password: hashedPassword,
            phone: "9123594031",
            role: "SUPER_ADMIN",
            status: "ACTIVE"
        });

        console.log("super admin created successfully");

    } catch (error) {
        console.log(error);
    } finally {
        await sequelize.close();
    }
};

createAdmin();