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

module.exports = { createReport };