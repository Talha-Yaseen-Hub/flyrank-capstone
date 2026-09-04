import { NextResponse } from 'next/server';

// Simple in-memory/serverless contact submissions store
const submissions = [];

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // 1. Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // 2. Process Submission
    const submissionRecord = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || 'Unknown',
      status: 'received'
    };

    submissions.push(submissionRecord);
    console.log('[Contact API] New inquiry received:', submissionRecord);

    // 3. Return confirmation response
    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received successfully.',
      submissionId: submissionRecord.id,
      receivedAt: submissionRecord.timestamp,
      data: {
        name: submissionRecord.name,
        email: submissionRecord.email
      }
    }, { status: 200 });

  } catch (error) {
    console.error('[Contact API] Internal Server Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    totalSubmissions: submissions.length,
    service: 'Talha Yaseen Portfolio Contact Endpoint'
  });
}
