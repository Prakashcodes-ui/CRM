// models/LeadAssignment.js

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const LeadAssignment = sequelize.define("LeadAssignment", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        leadId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        assignedTo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        assignedBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        assignedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "leadAssigned",
        timestamps: true,
    }
);

export default LeadAssignment;