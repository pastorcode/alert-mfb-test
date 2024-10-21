import { seedRoles } from './entity/role';
import { seedUsers } from './entity/user';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await seedRoles();
  await seedUsers();
  console.log('Seeding completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
