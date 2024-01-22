const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.socialButton.createMany({
      data: [
        { type: "FACEBOOK" },
        { type: "TWITTER" },
        { type: "INSTAGRAM" },
        { type: "LINKEDIN" },
        { type: "YOUTUBE" },
        { type: "GITHUB" },
      ],
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
