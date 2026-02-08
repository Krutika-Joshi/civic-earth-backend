const decideAuthority = (report) => {
  switch (report.category) {
    case "garbage":
      return "municipal";

    case "water":
      return "pollution_board";

    case "tree":
      return "forest";

    case "air":
      return "pollution_board";

    default:
      return null;
  }
};

module.exports = decideAuthority;

