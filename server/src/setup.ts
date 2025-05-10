import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import logger from './utils/logger';

// Initialize Prisma client
const prisma = new PrismaClient();

/**
 * Setup script to run database migrations and seed data
 * This can be used both locally and in production where shell access is not available
 */
async function setup() {
  try {
    logger.info('Running database setup...');
    
    // Generate Prisma client
    logger.info('Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    // Migrate database
    logger.info('Running database migrations...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    
    // Check if seed data is needed by counting users
    const userCount = await prisma.user.count();
    
    if (userCount === 0) {
      logger.info('No users found, seeding database...');
      execSync('npx prisma db seed', { stdio: 'inherit' });
      logger.info('Database seeded successfully');
    } else {
      logger.info(`Found ${userCount} users, skipping seed operation`);
    }
    
    logger.info('Database setup completed successfully');
  } catch (error) {
    logger.error('Error during database setup:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export default setup; 