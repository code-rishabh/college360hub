import { NextResponse } from 'next/server'

export async function GET() {
  const dates = []
  const currentDate = new Date()
  
  for (let i = 0; i < 90; i++) {
    const checkDate = new Date(currentDate)
    checkDate.setDate(currentDate.getDate() + i)
    
    if (checkDate.getDay() === 0 || checkDate.getDay() === 6) { // Sunday or Saturday
      dates.push(checkDate.toISOString().split('T')[0])
    }
  }
  
  return NextResponse.json(dates)
}
