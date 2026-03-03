// app/api/donation/initialize/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { pesapalService } from '@/lib/services/pesapal';

export async function POST(request: NextRequest) {
  try {
    const donationData = await request.json();
    
    // Log received data (without sensitive info)
    console.log('Donation data received:', {
      amount: donationData.amount,
      cause: donationData.cause,
      reference: donationData.reference,
      hasDonor: !!donationData.donor
    });
    
    // Validate required fields
    if (!donationData.amount || donationData.amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid donation amount' },
        { status: 400 }
      );
    }
    
    if (!donationData.reference) {
      return NextResponse.json(
        { success: false, error: 'Missing reference' },
        { status: 400 }
      );
    }

    if (!donationData.donor?.email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.PESAPAL_CONSUMER_KEY || !process.env.PESAPAL_CONSUMER_SECRET) {
      console.error('Missing PesaPal credentials');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Payment service not properly configured. Please contact support.' 
        },
        { status: 500 }
      );
    }

    // Initialize payment with PesaPal
    console.log('Initializing PesaPal payment...');
    const result = await pesapalService.initializePayment(donationData);
    
    console.log('PesaPal initialization result:', result);
    
    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      // Log the full error for debugging
      console.error('PesaPal initialization failed:', result);
      
      return NextResponse.json({
        success: false,
        error: result.error || 'Payment initialization failed',
        details: process.env.NODE_ENV === 'development' ? result.details : undefined
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Donation initialization error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}