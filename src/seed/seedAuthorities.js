require("dotenv").config();

const mongoose = require("mongoose");
const Authority = require("../models/Authority");

const seedAuthorities = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Authority.insertMany([
      {
        name: "Municipal Corporation",
        type: "municipal",
        jurisdiction: "Mumbai",
        email: "municipal@mumbai.gov.in"
      },
      {
        name: "Pollution Control Board",
        type: "pollution_board",
        jurisdiction: "Mumbai",
        email: "pollution@mumbai.gov.in"
      },
      {
        name: "Forest Department",
        type: "forest",
        jurisdiction: "Mumbai",
        email: "forest@mumbai.gov.in"
      }
    ]);

    console.log("Authorities seeded successfully");
    process.exit();


  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAuthorities();
