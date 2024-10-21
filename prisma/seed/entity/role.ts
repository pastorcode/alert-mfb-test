import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedRoles = async () => {
  const roles = [
    {
      id: 1,
      name: 'User',
      permissions: ['READ', 'WRITE', 'UPDATE'],
    },
    {
      id: 2,
      name: 'Admin',
      permissions: ['DELETE'],
    },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {
        name: role.name,
        permissions: role.permissions,
      },
      create: {
        id: role.id,
        name: role.name,
        permissions: role.permissions,
      },
    });
  }

  console.log('Roles seeded successfully');
};
