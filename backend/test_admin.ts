import { db } from './src/db/index.js';
import { users } from './src/db/schema.js';
import { desc } from 'drizzle-orm';

async function test() {
    const allUsers = await db.select({
      id: users.id,
      email: users.email,
      phone: users.phone,
      firstName: users.firstName,
      lastName: users.lastName,
      role: users.role,
      touristConfig: users.touristConfig,
      providerConfig: users.providerConfig,
      createdAt: users.createdAt
    }).from(users).orderBy(desc(users.createdAt));
    
    // Segregate for convenience (a dual-role user might appear in both lists)
    const tourists = allUsers.filter(u => u.role === 'tourist' || u.touristConfig);
    const providers = allUsers.filter(u => ['homestay', 'driver', 'cafe', 'provider-pending'].includes(u.role) || u.providerConfig);
    
    console.log(JSON.stringify({
      total: allUsers.length,
      tourists: tourists.length,
      providers: providers.length,
      touristsData: tourists,
      providersData: providers
    }, null, 2));
    process.exit(0);
}
test().catch(console.error);
