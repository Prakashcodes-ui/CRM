import Lead from "./Lead.js";
import LeadAssignment from "./LeadAssigned.js";


LeadAssignment.belongsTo(Lead, {
    foreignKey: "leadId",
    as: "lead"
});


export {
    LeadAssignment
}; 