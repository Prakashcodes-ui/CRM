
import Lead from "../models/Lead.js";

export const createLead = async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      company,
      source,
      requirement,
      lostReason
    } = req.body;

    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      source,
      requirement,
      createdBy: req.user.id,
      status: "NEW",
      lostReason
    });

    res.status(201).json({
      message: "Lead created successfully",
      lead,
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to create lead",
      error: error.message,
    });

  }
};

export const updateLeadStatus = async (req, res) => {

  try {

    const { id } = req.params;
    const { status, lostReason } = req.body;

    const lead = await Lead.findByPk(id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
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