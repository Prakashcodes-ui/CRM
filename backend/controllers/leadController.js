
import Lead from "../models/Lead.js";

export const createLead = async(req, res) => {
  try{
    const {name, email, phone, company, source, requirement, status, createdBy, lostReason} = req.body;

    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      source,
      requirement,
      status:"NEW",
      createdBy:req.user.id,
      lostReason
    })

    res.status(200).json({
      message:"Lead created successfully",
      lead
    })

  }catch(error){
    res.status(500).json({
      message:"Lead created failed",
      error:error.message
    })
  }
}

export const updateLeadStatus = async (req, res) => {

  try {

    const {id} = req.params;
    const {status, lostReason} = req.body;

    const lead = await Lead.findByPk(id);
    if(!lead){
      res.json({
        message:"Lead not found"
      })
    }

    await lead.update({
      status,
      lostReason:
        status === "LOST"
          ? lostReason
          : null,
    });

    res.json({
      message: "Lead status updated successfully",
      lead,
    });

  } catch (error) {

    res.status(500).json({
      message: "Status update failed",
      error: error.message,
    });

  }
};