import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedUsers = async () => {
  // Seed Admin user with UserRole relation
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      passwordHash:
        '$2b$10$0UfkrUZeEJPwbFop7.I4UeggIBP33tQPAL9r8n1UIrS5IRW/W7H.i', // Password: Password123@
      roles: {
        create: {
          roleId: 2,
          assignedByUserId: 1,
        },
      },
    },
  });

  // Seed regular user with UserRole relation
  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      firstName: 'Regular',
      lastName: 'User',
      email: 'user@example.com',
      passwordHash:
        '$2b$10$0UfkrUZeEJPwbFop7.I4UeggIBP33tQPAL9r8n1UIrS5IRW/W7H.i', // Password: Password123@
      roles: {
        create: {
          roleId: 1,
          assignedByUserId: 1,
        },
      },
    },
  });

  console.log('Users seeded successfully');
};
