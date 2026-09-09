import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  const admin = await prisma.user.upsert({
    where: { email: 'pirzadehroot@gmail.com' },
    update: {},
    create: {
      username: 'pirroot',
      email: 'pirzadehroot@gmail.com',
      emailVerified: true,
      password: 'dev8090100',
      name: 'sina',
      family: 'pirzadeh',
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created/updated:', admin.email);
  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
