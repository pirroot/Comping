import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is required');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

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
