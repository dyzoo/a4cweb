// app/api/donation/ipn/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const notification = await request.json();
    
    // Log the IPN notification for debugging
    console.log('IPN Received:', notification);
    
    // Verify the IPN notification (you might want to verify with PesaPal)
    // const isValid = await verifyIPNWithPesaPal(notification);
    
    // Update donation status in your database
    // await updateDonationFromIPN(notification);
    
    // Send thank you email if payment is successful
    // if (notification.status === 'COMPLETED') {
    //   await sendThankYouEmail(notification);
    // }
    
    // Always return 200 to acknowledge receipt
    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error) {
    console.error('IPN error:', error);
    // Still return 200 to prevent PesaPal from retrying indefinitely
    return NextResponse.json({ status: 'received' }, { status: 200 });
  }
}