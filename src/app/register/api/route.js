// pages/api/register.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, exp_email, password, fname, lname, line_id, tel } = await request.json();
    
    // Parse the exp_email string into a Date object
    const expEmailDate = new Date(exp_email);
    
    // Create new user with email addresses and expiration dates
    const newUser = await prisma.user.create({
      data: {
        email,
        exp_email: expEmailDate,
        password,
        fname,
        lname,
        line_id,
        tel,
      }
    });

    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// test add

// {
//   "email": "test@example.com",
//   "email2": "test2@example.com",
//   "email3": "test3@example.com",
//   "email4": "test4@example.com",
//   "exp_email": "2024-12-31T23:59:59Z",   // Example expiration date for email
//   "exp_email2": null,                    // No expiration date provided for email2
//   "exp_email3": null,  // Example expiration date for email3
//   "exp_email4": null,                    // No expiration date provided for email4
//   "password": "password123",
//   "fname": "John",
//   "lname": "Doe",
//   "line_id": "line123",
//   "tel": "1234567890",
//   "status": "1"
// }



export async function DELETE(request) {
  try {
    const { email } = await request.json();

    // Delete user
    const deletedUser = await prisma.user.delete({
      where: { email }
    });

    return new Response(JSON.stringify(deletedUser), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// test delete

// {
//   "email": "test@example.com"
// }


export async function PUT(request) {
  try {
    const { email,email2, email3, email4, password, fname, lname, line_id, tel, status } = await request.json();

    // Update user
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        email2,
        email3,
        email4,
        password,
        fname,
        lname,
        line_id,
        tel,
        status,
      }
    });

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// test update

// {
//   "email": "test@example.com",
//   "email2": "updated2@example.com",
//   "email3": "updated3@example.com",
//   "email4": "updated4@example.com",
//   "password": "newpassword",
//   "fname": "Updated First Name",
//   "lname": "Updated Last Name",
//   "line_id": "updated_line_id",
//   "tel": "9876543210",
//   "status": "1"
// }