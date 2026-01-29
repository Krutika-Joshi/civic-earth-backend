const statusTransitions = {
    submitted: ["under_review", "rejected"],
    under_review: ["verified", "rejected"],
    verified: ["in-progress", "rejected"],
    in_progress: ["resolved"],
    resolved: [],
    rejected: []
};


module.exports = statusTransitions;