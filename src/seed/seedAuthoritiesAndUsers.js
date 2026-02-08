require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Authority = require("../models/Authority");
const User = require("../models/User");

const seedAuthoritiesAndUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Authority.deleteMany({});
    await User.deleteMany({ role: "authority" });

    const hashedPassword = await bcrypt.hash("authority123", 10);

    const authoritiesData = [
      //Mumbai
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
      },

       // Pune
      {
        name: "Pune Municipal Corporation",
        type: "municipal",
        jurisdiction: "Pune",
        email: "pmc@pune.gov.in"
      },
      {
        name: "Maharashtra Pollution Control Board Pune",
        type: "pollution_board",
        jurisdiction: "Pune",
        email: "mpcb@maha.gov.in"
      },
      {
        name: "Forest Department Pune",
        type: "forest",
        jurisdiction: "Pune",
        email: "forest@pune.gov.in"
      }

    ];



    const createdAuthorities = await Authority.insertMany(authoritiesData);

    console.log("Authorities seeded successfully");
    
    //create authority users
    const authorityUsers = createdAuthorities.map((authority) => ({
      name: authority.name + " Officer",

      // REQUIRED by User schema
      displayName: authority.name.replace(/\s+/g, "_") + "_Officer",
      city: authority.jurisdiction,

      email: authority.email,
      password: hashedPassword,
      role: "authority",
      authorityId: authority._id
    }));

    await User.insertMany(authorityUsers);

    console.log("Authority users seeded");
    console.log("Authority login password (DEV): authority123");

    process.exit(0);

  } catch (error) {
    console.error("Seeding failed",error);
    process.exit(1);
  }
};

seedAuthoritiesAndUsers();
