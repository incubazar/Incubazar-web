/**
 * Email Sending with RESEND - Production Ready
 * 
 * Install: npm install resend
 * Get API Key: https://resend.com
 * Add to .env.local: RESEND_API_KEY=re_xxxxx
 */

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendOTPEmailParams {
  to: string;
  otp: string;
  name: string;
  userType: 'founder' | 'investor';
}

export async function sendOTPEmail({ to, otp, name, userType }: SendOTPEmailParams): Promise<boolean> {
  try {
    // In development, log to console
    if (process.env.NODE_ENV === 'development') {
      console.log('='.repeat(60));
      console.log('📧 OTP EMAIL');
      console.log('='.repeat(60));
      console.log(`To: ${to}`);
      console.log(`Name: ${name}`);
      console.log(`User Type: ${userType}`);
      console.log(`OTP: ${otp}`);
      console.log('='.repeat(60));
      return true;
    }

    // Production: Send real email with Resend
    const { data, error } = await resend.emails.send({
      from: 'Incubazar <noreply@incubazar.com>', // Use your verified domain
      to: [to],
      subject: 'Your Incubazar Verification Code',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 40px;">
                <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: inline-flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-weight: bold; font-size: 24px;">IB</span>
                </div>
                <h1 style="margin: 20px 0 0 0; font-size: 28px; color: #1a1a1a;">Welcome to Incubazar!</h1>
              </div>

              <!-- Content -->
              <div style="background: #f8f9fa; border-radius: 12px; padding: 32px; margin-bottom: 32px;">
                <p style="margin: 0 0 24px 0; font-size: 16px; color: #4a4a4a; line-height: 1.6;">
                  Hello <strong>${name}</strong>,
                </p>
                <p style="margin: 0 0 24px 0; font-size: 16px; color: #4a4a4a; line-height: 1.6;">
                  Your application has been approved! Here's your verification code to complete your registration:
                </p>
                
                <!-- OTP Code -->
                <div style="background: white; border: 2px solid #e0e0e0; border-radius: 8px; padding: 24px; text-align: center; margin: 32px 0;">
                  <div style="font-size: 40px; font-weight: bold; letter-spacing: 12px; color: #1a1a1a; font-family: 'Courier New', monospace;">
                    ${otp}
                  </div>
                </div>

                <p style="margin: 24px 0 0 0; font-size: 14px; color: #666; line-height: 1.6;">
                  ⏱️ This code will expire in <strong>30 minutes</strong>
                </p>
              </div>

              <!-- Instructions -->
              <div style="background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                <h3 style="margin: 0 0 16px 0; font-size: 18px; color: #1a1a1a;">Next Steps:</h3>
                <ol style="margin: 0; padding-left: 20px; color: #4a4a4a; font-size: 14px; line-height: 1.8;">
                  <li>Visit <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/register" style="color: #667eea; text-decoration: none;">incubazar.com/auth/register</a></li>
                  <li>Enter your email address</li>
                  <li>Enter the verification code above</li>
                  <li>Create your password</li>
                </ol>
              </div>

              <!-- Footer -->
              <div style="text-align: center; padding-top: 32px; border-top: 1px solid #e0e0e0;">
                <p style="margin: 0 0 8px 0; font-size: 12px; color: #999;">
                  If you didn't request this code, please ignore this email.
                </p>
                <p style="margin: 0; font-size: 12px; color: #999;">
                  © ${new Date().getFullYear()} Incubazar. All rights reserved.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Hello ${name},

Your application has been approved!

Your verification code is: ${otp}

This code will expire in 30 minutes.

To complete registration:
1. Visit incubazar.com/auth/register
2. Enter your email
3. Enter this verification code
4. Create your password

If you didn't request this, please ignore this email.

© ${new Date().getFullYear()} Incubazar. All rights reserved.`
    });

    if (error) {
      console.error('Resend error:', error);
      return false;
    }

    console.log('✅ Email sent successfully:', data);
    return true;

  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false;
  }
}

// Send welcome email after registration
export async function sendWelcomeEmail({ to, name, userType }: { to: string; name: string; userType: 'founder' | 'investor' }) {
  try {
    const dashboardUrl = userType === 'founder' 
      ? `${process.env.NEXT_PUBLIC_APP_URL}/founder`
      : `${process.env.NEXT_PUBLIC_APP_URL}/investor`;

    await resend.emails.send({
      from: 'Incubazar <noreply@incubazar.com>',
      to: [to],
      subject: `Welcome to Incubazar, ${name}! 🎉`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="font-size: 28px; color: #1a1a1a;">Welcome to Incubazar! 🎉</h1>
              <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6;">
                Hello ${name},
              </p>
              <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6;">
                Your account has been successfully created. You're now part of India's premier private placement platform!
              </p>
              <div style="text-align: center; margin: 32px 0;">
                <a href="${dashboardUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  Go to Dashboard
                </a>
              </div>
              <p style="font-size: 14px; color: #666;">
                Best regards,<br>
                The Incubazar Team
              </p>
            </div>
          </body>
        </html>
      `
    });

    return true;
  } catch (error) {
    console.error('Welcome email error:', error);
    return false;
  }
}

// Waitlist confirmation email (sent immediately when user joins)
export async function sendWaitlistConfirmationEmail({ to, name, userType }: { to: string; name: string; userType: 'founder' | 'investor' }) {
  try {
    await resend.emails.send({
      from: 'Incubazar <noreply@incubazar.com>',
      to: [to],
      subject: '✅ You\'re on the Incubazar Waitlist!',
      html: `
        <!DOCTYPE html>
        <html>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="text-align: center; margin-bottom: 40px;">
                <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                  <span style="color: white; font-weight: bold; font-size: 24px;">IB</span>
                </div>
                <h1 style="margin: 0; font-size: 28px; color: #1a1a1a;">You're on the Waitlist! 🎉</h1>
              </div>

              <div style="background: #f8f9fa; border-radius: 12px; padding: 32px; margin-bottom: 32px;">
                <p style="margin: 0 0 16px 0; font-size: 16px; color: #4a4a4a; line-height: 1.6;">
                  Hello <strong>${name}</strong>,
                </p>
                <p style="margin: 0 0 16px 0; font-size: 16px; color: #4a4a4a; line-height: 1.6;">
                  Thank you for joining the Incubazar waitlist as a <strong>${userType}</strong>! We've received your application and our team will review it shortly.
                </p>
                <p style="margin: 0; font-size: 16px; color: #4a4a4a; line-height: 1.6;">
                  We'll send you an email with your verification code once your application is approved.
                </p>
              </div>

              <div style="background: #e3f2fd; border-left: 4px solid #2196f3; padding: 16px; border-radius: 4px; margin-bottom: 32px;">
                <p style="margin: 0; font-size: 14px; color: #1976d2; font-weight: 600;">
                  ⏱️ What's Next?
                </p>
                <p style="margin: 8px 0 0 0; font-size: 14px; color: #1565c0; line-height: 1.6;">
                  Our admin team typically reviews applications within 24-48 hours. You'll receive an email with your verification code once approved.
                </p>
              </div>

              <div style="text-align: center; padding-top: 32px; border-top: 1px solid #e0e0e0;">
                <p style="margin: 0 0 8px 0; font-size: 12px; color: #999;">
                  Questions? Reply to this email or contact us at support@incubazar.com
                </p>
                <p style="margin: 0; font-size: 12px; color: #999;">
                  © ${new Date().getFullYear()} Incubazar. All rights reserved.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Hello ${name},

Thank you for joining the Incubazar waitlist as a ${userType}!

We've received your application and our team will review it shortly.

What's Next?
Our admin team typically reviews applications within 24-48 hours. You'll receive an email with your verification code once approved.

Questions? Reply to this email or contact us at support@incubazar.com

© ${new Date().getFullYear()} Incubazar. All rights reserved.`
    });
    return true;
  } catch (error) {
    console.error('Waitlist confirmation error:', error);
    return false;
  }
}

// Admin notification
export async function sendAdminWaitlistNotification({ waitlistEntry }: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log('📧 ADMIN NOTIFICATION:', waitlistEntry);
    return true;
  }

  try {
    await resend.emails.send({
      from: 'Incubazar System <system@incubazar.com>',
      to: [process.env.ADMIN_EMAIL || 'admin@incubazar.com'],
      subject: '🆕 New Waitlist Application',
      html: `
        <h2>New Waitlist Application</h2>
        <p><strong>Name:</strong> ${waitlistEntry.full_name}</p>
        <p><strong>Email:</strong> ${waitlistEntry.email}</p>
        <p><strong>Type:</strong> ${waitlistEntry.user_type}</p>
        ${waitlistEntry.startup_name ? `<p><strong>Startup:</strong> ${waitlistEntry.startup_name}</p>` : ''}
        ${waitlistEntry.business_idea ? `<p><strong>Idea:</strong> ${waitlistEntry.business_idea}</p>` : ''}
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/waitlist">Review Application</a>
      `
    });
    return true;
  } catch (error) {
    console.error('Admin notification error:', error);
    return false;
  }
}

