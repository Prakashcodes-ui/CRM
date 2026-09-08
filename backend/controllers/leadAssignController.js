import Lead from "../models/Lead.js";
import LeadAssignment from "../models/LeadAssigned.js";

export const assignLead = async (req, res) => {
    try{
        const {leadId, assignedTo} = req.body

        const lead = await Lead.findByPk(leadId);

        if(!lead){
            res.status(404).json({
                message:"lead not found"
            });
        }

        const assignment = await LeadAssignment.create({
            leadId,
            assignedTo,
            assignedBy:req.user.id,
            assignedAt: new Date()
        });

        await Lead.update(
            {
            status:"ASSIGNED"
            },
            {
                where:{
                    id:leadId
                }
            }
        );

        res.json({
            message:"Lead Assigned successfully",
            assignment
        })
    }catch(error){
        res.status(500).json({
            message:"Lead assigned failed",
            error:error.message
        })
    }
};

export const getMyassignedLeads = async (req, res) => {
    try{
        const staffId = req.user.id;

        const assignments = await LeadAssignment.findAll({
            where:{
                assignedTo:staffId
            },
            include:[
                {
                    model:Lead,
                    as:"lead"
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        res.status(200).json({
        message: "Assigned leads fetched successfully",
        leads: assignments
        });


    }catch(error){
        res.status(500).json({
            message:"Failed to fatch assigned leads",
            error:error.message
        })
    }
}