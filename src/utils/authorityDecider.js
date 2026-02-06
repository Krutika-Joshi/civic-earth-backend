const decideAuthority = (report) => {
  if (report.cause === "garbage_dumping") return "municipal";
  if (report.cause === "water_pollution") return "pollution_board";
  if (report.cause === "tree_cutting") return "forest";
  return null;
};

module.exports = decideAuthority;
