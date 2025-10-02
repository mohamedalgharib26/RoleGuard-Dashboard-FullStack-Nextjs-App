 
const { PrismaClient } = require("@prisma/client");
 
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const email = "admin@example.com";
  const password = "Admin123!";
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    console.log("Admin user already exists.");
    return;
  }

  const user = await prisma.user.createMany({
    data: [
      { name: "Admin", email, hashedPassword, role: "Admin" },
      {
        name: "User",
        email: "user@user.com",
        hashedPassword,
        role: "User",
      },
      {
        name: "Moderator",
        email: "moderator@user.com",
        hashedPassword,
        role: "Moderator",
      },
    ],
  });

  console.log("Admin user created:");
  console.log({ email: user.email, password });
  console.log({ role: user.role, role });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
