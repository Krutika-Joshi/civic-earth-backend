const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        cause: {
            type: String
        },
        media: [
            {
                type: {
                    type: String,
                    enum: ["image", "video"],
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        ],
        city: {
            type: String,
            required: true
        },
        area: {
            type: String,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        },
        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        displayName: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["Pending", "Resolved"],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;