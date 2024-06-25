import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers'

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET_KEY; 

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        // Step 1: Find user by email
        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!user) {
            // User not found
            return new Response(JSON.stringify({ error: 'user not found' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Step 2: Verify password (since passwords are stored directly, compare them directly)
        if (user.password !== password) {
            // Incorrect password
            return new Response(JSON.stringify({ error: 'password not match' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Step 3: Generate JWT token
        const token = sign({ userId: user.id, email: user.email,name:user.fname }, JWT_SECRET, {
            expiresIn: '1h' 
        });

        cookies().set('token', token)

        // Return success with token
        return new Response(JSON.stringify({ token }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    } finally {
        await prisma.$disconnect(); 
    }
}
