import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../../../.env.local') });

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error('NEXT_PUBLIC_SUPABASE_URL is required');
if (!process.env.SUPABASE_SERVICE_ROLE) throw new Error('SUPABASE_SERVICE_ROLE is required');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE
)
const categories = [
    "Housing",
    "Food",
    "Transportation",
    "Healthcare",
    "Utilities",
    "Education",
    "Clothing",
    "Entertainment",
    "Personal Care",
    "Miscellaneous",
    "Savings",
    "Investments",
    "Insurance",
    "Gifts",
    "Travel"
];
async function seedUsers() {
    for (let i = 0; i<5; i++){
        try{
            const { error } = await supabase.auth.admin.createUser({
                email: faker.internet.email(),
                password: 'password',
            });
            
            if (error) {
                console.error("Error creating user:", error);
            }
        } catch (e) {
            console.error("Exception creating user:", e);
        }
    }
}
async function seed() {
    await seedUsers()
    let transactions = [];
    const {data:{users}, error:listUsersError} = await supabase.auth.admin.listUsers()

    if( listUsersError ) {
        console.error("Error listing users:", listUsersError);
        return;
    }
    const userIds = users?.map(user => user.id) || [];

    for (let i = 0; i < 100; i++) {
        const created_at = faker.date.past();
        const type = faker.helpers.arrayElement(["Income", "Expense", "Saving", "Investment"]);
        const category = faker.helpers.arrayElement(categories);
        const user_id = faker.helpers.arrayElement(userIds);

        let amount;
        switch (type) {
            case "Income":
                amount = faker.number.int({ min: 100, max: 10000 });
                break;
            case "Expense":
                amount = faker.number.int({ min: 10, max: 5000 });
                break;
            case "Saving":
                amount = faker.number.int({ min: 50, max: 2000 });
                break;
            case "Investment":
                amount = faker.number.int({ min: 100, max: 5000 });
                break;
        }
        
        transactions.push({
            created_at,
            type,
            amount,
            description: faker.lorem.sentence(),
            category,
            user_id
        });
    }

    const {error} = await supabase.from("transactions").insert(transactions);
    if (error) {
        console.error("Error inserting transactions:", error);
    }
    else {
        console.log("Transactions seeded successfully");
    }
}


seed();