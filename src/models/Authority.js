const { default: mongoose } = require("mongoose");

const authoritySchema = new mongoose.Schema({
    name: {type: String, required: true },
    type: {
        type: String,
        enum: ["municipal", "pollution_board", "forest"],
        required: true
    },
    jurisdiction: {type: String, required: true },
    email: {type: String, required: true },

    assignedReports: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Report"}
    ]
});

module.exports = mongoose.model("Authority", authoritySchema);