'use server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function getUserEmail() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  
  if (!token) {
    throw new Error('No token found')
  }
  
  const decodedToken = jwt.decode(token.value)

  if (!decodedToken || !decodedToken.email) {
    throw new Error('Invalid token or email not found in token')
  }
  
  return decodedToken.email
}
