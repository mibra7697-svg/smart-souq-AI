import { prisma } from "./src/core/prisma/client";

async function main() {
  console.log("Testing database connection...");
  try {
    const userCount = await prisma.user.count();
    console.log(`Connection successful! User count: ${userCount}`);
  } catch (error) {
    console.error("Connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
