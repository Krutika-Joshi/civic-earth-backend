const mongoose = require("mongoose");
const Report = require("../models/Report");

const createReport = async (req, res) => {
    try{ 
        const {
            title,
            description,
            category,
            cause,
            city,
            area,
            latitude,
            longitude,
            media
        } = req.body;

        if ( 
            !title ||
            !description ||
            !category ||
            !city ||
            !area ||
            latitude === undefined ||
            longitude === undefined
        ) {
            return res.status(400).json({
                message: "All required fields must be provided"
            });
        }

        if(!media || !Array.isArray(media) || media.length === 0) {
            return res.status(400).json({
                message: "At least one image or video is required"
            });
        }

        for (let item of media){
            if(!item.type || !item.url){
                return res.status(400).json({
                    message: "Each media item must have type and url"
                });
            }
        }

        const report = await Report.create({
            title,
            description,
            category,
            cause,
            city,
            area,
            latitude,
            longitude,
            media,
            reportedBy: req.user.id,
            displayName: req.user.displayName || "Anonymous"
        });

        res.status(201).json({
            message: "Report created successfully",
            report
        });


    } catch(error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getReports = async(req, res) => {
    try{
        const { page = 1, limit = 10, status, category, city } = req.query;

        const query = {};

        //role based access
        if(req.user.role === "citizen") {
            // query.reportedByBy = req.user.id;
        }

        //filters
        if(status) {
            query.status = status;
        }
        if(category) {
            query.category = category;
        }
        if(city) {
            query.city = city;
        }

        const reports = await Report.find(query)
        .sort({ createdAt: -1 }) //latest first
        .skip((page - 1) * limit)
        .limit(Number(limit));

        const total = await Report.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            page: Number(page),
            reports
        });




    } catch(error) {
        res.status(500).json({
            messgae: "server error",
            error: error.message
        });
    }
};


const getSingleReport = async(req, res) => {
    try{

        const{id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid report ID"
            });
        }

        const report = await Report.findById(id).populate(
            "reportedBy",
            "displayName"
        );

        if(!report) {
            return res.status(404).json({
                message: "Report not found"
            });
        }
        res.status(200).json(report);

    } catch(error){
        res.status(500).json({
            message: "Server error"
        });
    }
};

const updateReportStatus = async(req, res) => {
    try {

        const { id } = req.params;
        const { status, authorityComment } = req.body;

        //role check 
        if(!["authority", "admin"].includes(req.user.role)) {
            return res.send(403).json({
                message: "Access denied"
            });
        }

        //validate report id
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.send(400).json({
                message: "Invalid report ID"
            });
        }

        //fetch report
        const report = await Report.findById(id);

        if(!report) {
            return res.send(404).json({
                message: "Report not found "
            });
        }

        //allowed transitions
        const allowedTransitions = {
            pending: ["in-progress", "rejected"],
            "in-progress": ["resolved"],
        };

        if( !allowedTransitions[report.status] || !allowedTransitions[report.status].includes(status)) {
            return res.status(400).json({
                message: `Cannot change status from ${report.status} to ${status}`,
            });
        }

        //side effects
        if(status === "in-progress") {
            report.assignedAt = new Date();
        }

        if(status === "resolved") {
            report.resolvedAt = new Date();
        }

        if(status === "rejected" && !authorityComment) {
            return res.status(400).json({
                message: "Rejection requires a comment"
            });
        }

        //update fields
        report.status = status;
        report.authorityComment = authorityComment || "";

        await report.save();

        return res.status(200).json({
            message: "Report status updated Successfully",
            report,
        });

    } catch(error) {
        console.error(error);
        res.send(500).json({
            message: "Server error"
        });
    }
};

module.exports = { createReport, getReports, getSingleReport, updateReportStatus };