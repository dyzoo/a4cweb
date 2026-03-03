// app/api/donation/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { pesapalService } from '@/lib/services/pesapal';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orderTrackingId = searchParams.get('OrderTrackingId');
  const orderMerchantReference = searchParams.get('OrderMerchantReference');

  if (!orderTrackingId) {
    return NextResponse.redirect(new URL('/donation/failed', request.url));
  }

  try {
    // Verify payment status
    const paymentStatus = await pesapalService.verifyPaymentStatus(orderTrackingId);
    
    if (paymentStatus === 'COMPLETED' || paymentStatus === 'SUCCESS') {
      // Update donation status in your database
      // await updateDonationStatus(orderMerchantReference, 'completed');
      
      // Redirect to success page
      return NextResponse.redirect(
        new URL(`/donation/success?reference=${orderMerchantReference}`, request.url)
      );
    } else {
      // Redirect to failure page
      return NextResponse.redirect(
        new URL(`/donation/failed?reference=${orderMerchantReference}`, request.url)
      );
    }
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect(new URL('/donation/failed', request.url));
  }
}