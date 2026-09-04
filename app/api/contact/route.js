import { NextResponse } from 'next/server';

// Simple in-memory/serverless contact submissions store
const submissions = [];
const lastSubmissionTimes = new Map();

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    const trimmedName = (name || '').trim();
    const trimmedEmail = (email || '').trim().toLowerCase();
    const trimmedMessage = (message || '').trim();

    // 1. Validation: Required fields
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // 2. Length & Garbage Validation
    if (trimmedName.length < 2 || trimmedName.length > 60) {
      return NextResponse.json(
        { success: false, error: 'Name must be between 2 and 60 characters.' },
        { status: 400 }
      );
    }

    if (trimmedMessage.length < 10 || trimmedMessage.length > 2000) {
      return NextResponse.json(
        { success: false, error: 'Message must be at least 10 characters long (max 2000).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address (e.g. user@domain.com).' },
        { status: 400 }
      );
    }

    // XSS / Script Tag Sanitization check
    if (/<script|javascript:/i.test(trimmedName) || /<script|javascript:/i.test(trimmedMessage)) {
      return NextResponse.json(
        { success: false, error: 'Invalid characters or script tags detected in submission.' },
        { status: 400 }
      );
    }

    // 3. Rapid Double Submission Cooldown (Anti-Spam)
    const now = Date.now();
    const lastTime = lastSubmissionTimes.get(trimmedEmail) || 0;
    if (now - lastTime < 5000) {
      return NextResponse.json(
        { success: false, error: 'Please wait 5 seconds before sending another submission.' },
        { status: 429 }
      );
    }
    lastSubmissionTimes.set(trimmedEmail, now);

    // 4. Process Submission
    const submissionRecord = {
      id: `sub_${now}_${Math.random().toString(36).substring(2, 7)}`,
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
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
