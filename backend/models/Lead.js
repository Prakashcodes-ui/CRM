import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Lead = sequelize.define(
    "Lead", 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
        },

        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        company: {
            type: DataTypes.STRING,
        },

        source: {
            type: DataTypes.STRING,
        },

        requirement: {
            type: DataTypes.TEXT,
        },

        status: {
            type: DataTypes.ENUM(
            "NEW",
            "ASSIGNED",
            "CONTACTED",
            "INTERESTED",
            "NEGOTIATION",
            "WON",
            "LOST"
            ),
            defaultValue: "NEW",
        },

        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        lostReason: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: "leads",
        timestamps: true,
    }
);

export default Lead;