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
    // Log to console (helpful for debugging)
    console.log('='.repeat(60));
    console.log('📧 SENDING OTP EMAIL VIA RESEND');
    console.log('='.repeat(60));
    console.log(`To: ${to}`);
    console.log(`OTP: ${otp}`);
    console.log('='.repeat(60));

    // Send real email with Resend
    console.log('Calling Resend API...');
    const { data, error } = await resend.emails.send({
      from: 'Incubazar <noreply@incubazar.com>', // Resend test domain - works without verification
      to: [to],
      subject: 'Your Incubazar Verification Code',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
            </style>
          </head>
          <body style="margin: 0; padding: 0; background: #ffffff; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0a0a0a;">
            <div style="max-width: 600px; margin: 0 auto; padding: 48px 24px;">
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 48px; padding-bottom: 32px; border-bottom: 2px solid #0a0a0a;">
                <h1 style="margin: 0 0 8px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 42px; font-weight: 700; color: #0a0a0a; letter-spacing: -0.02em; line-height: 1.2;">
                  Incubazar
                </h1>
                <p style="margin: 0; font-size: 14px; color: #666666; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">
                  Verification Code
                </p>
              </div>

              <!-- Main Content -->
              <div style="margin-bottom: 40px;">
                <p style="margin: 0 0 24px 0; font-size: 16px; color: #0a0a0a; line-height: 1.75;">
                  Hello <strong>${name}</strong>,
                </p>
                
                <p style="margin: 0 0 32px 0; font-size: 16px; color: #0a0a0a; line-height: 1.75;">
                  Your application has been approved. Here's your verification code to complete your registration and start connecting with ${userType === 'founder' ? 'investors' : 'innovative startups'}.
                </p>
                
                <!-- OTP Code -->
                              <div style="background-color: #f5f5f5; padding: 24px; border-radius: 8px; margin-top: 40px;">
                <p style="margin: 0 0 16px 0; font-size: 16px; color: #0a0a0a; font-weight: 600;">
                  Need Help Getting Started?
                </p>
                <p style="margin: 0 0 20px 0; font-size: 14px; color: #666666;">
                  Our team is here to help you succeed
                </p>
                <a href="mailto:support@incubazar.com" style="color: #0a0a0a; text-decoration: underline; font-weight: 600; font-size: 15px;">
                  support@incubazar.com
                </a>
              </div>

              <!-- Footer -->
              <div style="text-align: center; padding-top: 40px; border-top: 1px solid #e5e5e5;">
                <div style="margin: 0 0 20px 0;">
                  <a href="https://incubazar.com" style="color: #0a0a0a; text-decoration: none; margin: 0 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Website</a>
                  <span style="color: #cccccc;">•</span>
                  <a href="https://incubazar.com/legal/privacy" style="color: #0a0a0a; text-decoration: none; margin: 0 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Privacy</a>
                  <span style="color: #cccccc;">•</span>
                  <a href="https://incubazar.com/legal/terms" style="color: #0a0a0a; text-decoration: none; margin: 0 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Terms</a>
                  <span style="color: #cccccc;">•</span>
                  <a href="https://incubazar.com/legal/cookies" style="color: #0a0a0a; text-decoration: none; margin: 0 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Cookies</a>
                </div>

                <!-- CTA Button -->
                <div style="text-align: center; margin: 48px 0;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/register" style="display: inline-block; background: #0a0a0a; color: #ffffff; padding: 18px 48px; text-decoration: none; font-weight: 600; font-size: 15px; letter-spacing: 0.5px; text-transform: uppercase; border: none; transition: all 0.2s ease;">
                    Complete Registration →
                  </a>
                </div>
              </div>

              <!-- Instructions -->
              <div style="background: #f5f5f5; padding: 32px; margin-bottom: 40px;">
                <h3 style="margin: 0 0 24px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 20px; color: #0a0a0a; font-weight: 700; letter-spacing: -0.01em;">
                  Quick Start Guide
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; vertical-align: top; width: 32px;">
                      <strong style="display: inline-block; width: 24px; height: 24px; background: #0a0a0a; color: #ffffff; text-align: center; line-height: 24px; font-size: 13px; font-weight: 700;">1</strong>
                    </td>
                    <td style="padding: 12px 0 12px 16px; color: #0a0a0a; font-size: 14px; line-height: 1.6;">
                      Visit <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/register" style="color: #0a0a0a; text-decoration: underline; font-weight: 600;">incubazar.com/auth/register</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; vertical-align: top;">
                      <strong style="display: inline-block; width: 24px; height: 24px; background: #0a0a0a; color: #ffffff; text-align: center; line-height: 24px; font-size: 13px; font-weight: 700;">2</strong>
                    </td>
                    <td style="padding: 12px 0 12px 16px; color: #0a0a0a; font-size: 14px; line-height: 1.6;">
                      Enter your email: <strong>${to}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; vertical-align: top;">
                      <strong style="display: inline-block; width: 24px; height: 24px; background: #0a0a0a; color: #ffffff; text-align: center; line-height: 24px; font-size: 13px; font-weight: 700;">3</strong>
                    </td>
                    <td style="padding: 12px 0 12px 16px; color: #0a0a0a; font-size: 14px; line-height: 1.6;">
                      Enter the verification code above
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; vertical-align: top;">
                      <strong style="display: inline-block; width: 24px; height: 24px; background: #0a0a0a; color: #ffffff; text-align: center; line-height: 24px; font-size: 13px; font-weight: 700;">4</strong>
                    </td>
                    <td style="padding: 12px 0 12px 16px; color: #0a0a0a; font-size: 14px; line-height: 1.6;">
                      Create your password and start exploring
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Footer -->
              <div style="text-align: center; padding-top: 40px; border-top: 1px solid #e5e5e5;">
                <p style="margin: 0 0 20px 0; font-size: 13px; color: #666666; line-height: 1.6;">
                  If you didn't request this code, please ignore this email.
                </p>
                <div style="margin: 24px 0;">
                  <a href="https://incubazar.com" style="color: #0a0a0a; text-decoration: none; margin: 0 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Website</a>
                  <span style="color: #cccccc;">•</span>
                  <a href="https://incubazar.com/legal/privacy" style="color: #0a0a0a; text-decoration: none; margin: 0 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Privacy</a>
                  <span style="color: #cccccc;">•</span>
                  <a href="https://incubazar.com/legal/terms" style="color: #0a0a0a; text-decoration: none; margin: 0 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Terms</a>
                  <span style="color: #cccccc;">•</span>
                  <a href="https://incubazar.com/legal/cookies" style="color: #0a0a0a; text-decoration: none; margin: 0 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Cookies</a>
                </div>
                <p style="margin: 16px 0 0 0; font-size: 12px; color: #999999;">
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
      console.error('❌ RESEND ERROR:', JSON.stringify(error, null, 2));
      return false;
    }

    console.log('✅ EMAIL SENT SUCCESSFULLY!');
    console.log('Response:', JSON.stringify(data, null, 2));
    return true;

  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false;
  }
}

// Send welcome email after registration
export async function sendWelcomeEmail({ to, name, userType }: { to: string; name: string; userType: 'founder' | 'investor' }) {
  try {
    console.log(`📧 SENDING WELCOME EMAIL to ${to}`);
    
    const dashboardUrl = userType === 'founder' 
      ? `${process.env.NEXT_PUBLIC_APP_URL}/founder`
      : `${process.env.NEXT_PUBLIC_APP_URL}/investor`;

    const features = userType === 'founder' 
      ? [
          { icon: '🎯', title: 'Smart Matching', desc: 'Get matched with investors aligned to your vision' },
          { icon: '📊', title: 'Deal Management', desc: 'Track and manage all your funding rounds' },
          { icon: '🤝', title: 'Direct Connect', desc: 'Connect directly with interested investors' }
        ]
      : [
          { icon: '🔍', title: 'Deal Discovery', desc: 'Discover high-potential startup opportunities' },
          { icon: '📈', title: 'Portfolio Tracking', desc: 'Monitor and manage your investments' },
          { icon: '💡', title: 'Smart Insights', desc: 'AI-powered investment recommendations' }
        ];

    await resend.emails.send({
      from: 'Incubazar <noreply@incubazar.com>',
      to: [to],
      subject: `Welcome to Incubazar, ${name}! 🎉`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
            </style>
          </head>
          <body style="margin: 0; padding: 0; background: #ffffff; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0a0a0a;">
            <div style="max-width: 600px; margin: 0 auto; padding: 48px 24px;">
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 48px; padding-bottom: 32px; border-bottom: 2px solid #0a0a0a;">
                <h1 style="margin: 0 0 16px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 48px; font-weight: 700; color: #0a0a0a; letter-spacing: -0.02em; line-height: 1.1;">
                  Welcome to<br/>Incubazar
                </h1>
                <p style="margin: 0; font-size: 16px; color: #666666;">
                  Hello, <strong>${name}</strong>
                </p>
              </div>

              <!-- Success Message -->
              <div style="background: #0a0a0a; color: #ffffff; padding: 24px 32px; margin-bottom: 40px; text-align: center;">
                <p style="margin: 0; font-size: 15px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px;">
                  ✓ Account Created Successfully
                </p>
              </div>

              <!-- Main Content -->
              <div style="margin-bottom: 48px;">
                <p style="margin: 0 0 24px 0; font-size: 18px; color: #0a0a0a; line-height: 1.75; font-family: 'Playfair Display', Georgia, serif; font-style: italic;">
                  You're now part of India's premier matching platform connecting ${userType === 'founder' ? 'visionary founders with strategic investors' : 'strategic investors with innovative startups'}.
                </p>

                <!-- CTA Button -->
                <div style="text-align: center; margin: 48px 0;">
                  <a href="${dashboardUrl}" style="display: inline-block; background: #0a0a0a; color: #ffffff; padding: 18px 48px; text-decoration: none; font-weight: 600; font-size: 15px; letter-spacing: 0.5px; text-transform: uppercase;">
                    Go to Dashboard →
                  </a>
                </div>
              </div>

              <!-- Feature List -->
              <div style="margin-bottom: 48px;">
                <h2 style="margin: 0 0 32px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 28px; color: #0a0a0a; font-weight: 700; letter-spacing: -0.01em;">
                  What Awaits You
                </h2>
                ${features.map((feature, index) => `
                  <div style="border-left: 3px solid #0a0a0a; padding: 0 0 24px 24px; margin-bottom: 24px;">
                    <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #0a0a0a; font-weight: 700;">
                      ${feature.title}
                    </h3>
                    <p style="margin: 0; font-size: 15px; color: #666666; line-height: 1.6;">
                      ${feature.desc}
                    </p>
                  </div>
                `).join('')}
              </div>

              <!-- Quick Tips -->
              <div style="background: #f5f5f5; padding: 32px; margin-bottom: 48px;">
                <h3 style="margin: 0 0 24px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 22px; color: #0a0a0a; font-weight: 700; letter-spacing: -0.01em;">
                  Quick Start Guide
                </h3>
                <ul style="margin: 0; padding-left: 24px; color: #0a0a0a; font-size: 15px; line-height: 2; list-style: square;">
                  ${userType === 'founder' 
                    ? `<li>Complete your startup profile for better matches</li>
                       <li>Upload your pitch deck to attract investors</li>
                       <li>Browse investor profiles and start conversations</li>`
                    : `<li>Complete your investor profile and preferences</li>
                       <li>Set your investment criteria and sectors</li>
                       <li>Explore startup deals and express interest</li>`
                  }
                </ul>
              </div>

              <!-- Support Section -->
              <div style="text-align: center; padding: 32px; border: 2px solid #0a0a0a; margin-bottom: 40px;">
                <p style="margin: 0 0 16px 0; font-size: 16px; color: #0a0a0a; font-weight: 600;">
                  Need Help Getting Started?
                </p>
                <p style="margin: 0 0 20px 0; font-size: 14px; color: #666666;">
                  Our team is here to help you succeed
                </p>
                <a href="mailto:support@incubazar.com" style="color: #0a0a0a; text-decoration: underline; font-weight: 600; font-size: 15px;">
                  support@incubazar.com
                </a>
              </div>

              <!-- Footer -->
              <div style="text-align: center; padding-top: 40px; border-top: 1px solid #e5e5e5;">
                <div style="margin: 0 0 20px 0;">
                  <a href="https://incubazar.com" style="color: #0a0a0a; text-decoration: none; margin: 0 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Website</a>
                  <span style="color: #cccccc;">•</span>
                  <a href="https://incubazar.com/legal/privacy" style="color: #0a0a0a; text-decoration: none; margin: 0 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Privacy</a>
                  <span style="color: #cccccc;">•</span>
                  <a href="https://incubazar.com/legal/terms" style="color: #0a0a0a; text-decoration: none; margin: 0 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Terms</a>
                </div>
                <p style="margin: 0; font-size: 12px; color: #999999;">
                  © ${new Date().getFullYear()} Incubazar. All rights reserved.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Hello ${name},

Welcome to Incubazar! 🎉

Your account has been successfully created. You're now part of India's premier matching platform!

Go to your dashboard: ${dashboardUrl}

What's Waiting For You:
${features.map(f => `${f.icon} ${f.title} - ${f.desc}`).join('\n')}

Need help? Contact us at support@incubazar.com

Best regards,
The Incubazar Team

© ${new Date().getFullYear()} Incubazar. All rights reserved.`
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
    console.log('='.repeat(60));
    console.log(`📧 SENDING WAITLIST CONFIRMATION`);
    console.log(`To: ${to}`);
    console.log(`Name: ${name}`);
    console.log('='.repeat(60));
    
    const { data, error } = await resend.emails.send({
      from: 'Incubazar <noreply@incubazar.com>',
      to: [to],
      subject: '✅ You\'re on the Incubazar Waitlist!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
            </style>
          </head>
          <body style="margin: 0; padding: 0; background: #ffffff; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0a0a0a;">
            <div style="max-width: 600px; margin: 0 auto; padding: 48px 24px;">
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 48px; padding-bottom: 32px; border-bottom: 2px solid #0a0a0a;">
                <h1 style="margin: 0 0 8px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 42px; font-weight: 700; color: #0a0a0a; letter-spacing: -0.02em; line-height: 1.2;">
                  Incubazar
                </h1>
                <p style="margin: 0; font-size: 14px; color: #666666; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">
                  Waitlist Confirmation
                </p>
              </div>

              <!-- Success Badge -->
              <div style="text-align: center; margin-bottom: 40px;">
                <div style="display: inline-block; background: #0a0a0a; color: #ffffff; padding: 16px 32px;">
                  <span style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">✓ Application Received</span>
                </div>
              </div>

              <!-- Main Content -->
              <div style="margin-bottom: 48px;">
                <p style="margin: 0 0 24px 0; font-size: 18px; color: #0a0a0a; line-height: 1.75; font-family: 'Playfair Display', Georgia, serif; font-style: italic;">
                  Thank you for your interest in Incubazar, ${name}.
                </p>
                
                <p style="margin: 0 0 32px 0; font-size: 16px; color: #0a0a0a; line-height: 1.75;">
                  We've received your application and our team will review it shortly. You're one step closer to connecting with ${userType === 'founder' ? 'strategic investors' : 'innovative startups'}.
                </p>

                <!-- Timeline -->
                <div style="background: #f5f5f5; padding: 32px; margin-bottom: 40px;">
                  <h3 style="margin: 0 0 32px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 24px; color: #0a0a0a; font-weight: 700; letter-spacing: -0.01em; text-align: center;">
                    What Happens Next
                  </h3>
                  
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 16px 0; vertical-align: top; width: 32px;">
                        <strong style="display: inline-block; width: 28px; height: 28px; background: #0a0a0a; color: #ffffff; text-align: center; line-height: 28px; font-size: 14px; font-weight: 700; font-family: 'DM Sans', sans-serif;">1</strong>
                      </td>
                      <td style="padding: 16px 0 16px 16px;">
                        <h4 style="margin: 0 0 6px 0; font-size: 17px; color: #0a0a0a; font-weight: 700;">Admin Review</h4>
                        <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.6;">Our team reviews your application<br/><em style="color: #999999;">(typically within 24-48 hours)</em></p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 16px 0; vertical-align: top;">
                        <strong style="display: inline-block; width: 28px; height: 28px; background: #e5e5e5; color: #666666; text-align: center; line-height: 28px; font-size: 14px; font-weight: 700; font-family: 'DM Sans', sans-serif;">2</strong>
                      </td>
                      <td style="padding: 16px 0 16px 16px;">
                        <h4 style="margin: 0 0 6px 0; font-size: 17px; color: #0a0a0a; font-weight: 700;">Approval Email</h4>
                        <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.6;">You'll receive an email with your verification code</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 16px 0; vertical-align: top;">
                        <strong style="display: inline-block; width: 28px; height: 28px; background: #e5e5e5; color: #666666; text-align: center; line-height: 28px; font-size: 14px; font-weight: 700; font-family: 'DM Sans', sans-serif;">3</strong>
                      </td>
                      <td style="padding: 16px 0 16px 16px;">
                        <h4 style="margin: 0 0 6px 0; font-size: 17px; color: #0a0a0a; font-weight: 700;">Start Connecting</h4>
                        <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.6;">Complete registration and begin your journey</p>
                      </td>
                    </tr>
                  </table>
                </div>

                <div style="background: #0a0a0a; color: #ffffff; padding: 24px 32px; text-align: center;">
                  <p style="margin: 0; font-size: 15px; font-weight: 600; line-height: 1.6;">
                    Keep an eye on your inbox for the approval email!
                  </p>
                </div>
              </div>

              <!-- Why Incubazar -->
              <div style="margin-bottom: 48px;">
                <h3 style="margin: 0 0 32px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 28px; color: #0a0a0a; font-weight: 700; letter-spacing: -0.01em; text-align: center;">
                  Why Join Incubazar
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 16px 0; vertical-align: top; border-bottom: 1px solid #e5e5e5;">
                      <h4 style="margin: 0 0 8px 0; font-size: 17px; color: #0a0a0a; font-weight: 700;">Smart Matching</h4>
                      <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.6;">AI-powered connections between ${userType === 'founder' ? 'startups and investors' : 'investors and startups'}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 0; vertical-align: top; border-bottom: 1px solid #e5e5e5;">
                      <h4 style="margin: 0 0 8px 0; font-size: 17px; color: #0a0a0a; font-weight: 700;">Secure Platform</h4>
                      <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.6;">Verified ${userType === 'founder' ? 'investors' : 'startups'} and compliant deal flow</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 0; vertical-align: top;">
                      <h4 style="margin: 0 0 8px 0; font-size: 17px; color: #0a0a0a; font-weight: 700;">Streamlined Process</h4>
                      <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.6;">From discovery to deal closure, all in one place</p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Support Section -->
              <div style="text-align: center; padding: 32px; border: 2px solid #0a0a0a; margin-bottom: 40px;">
                <p style="margin: 0 0 12px 0; font-size: 16px; color: #0a0a0a; font-weight: 600;">
                  Have Questions?
                </p>
                <p style="margin: 0 0 20px 0; font-size: 14px; color: #666666;">
                  Our team is here to help
                </p>
                <a href="mailto:support@incubazar.com" style="color: #0a0a0a; text-decoration: underline; font-weight: 600; font-size: 15px;">
                  support@incubazar.com
                </a>
              </div>

              <!-- Footer -->
              <div style="text-align: center; padding-top: 40px; border-top: 1px solid #e5e5e5;">
                <div style="margin: 0 0 20px 0;">
                  <a href="https://incubazar.com" style="color: #0a0a0a; text-decoration: none; margin: 0 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Website</a>
                  <span style="color: #cccccc;">•</span>
                  <a href="https://incubazar.com/legal/privacy" style="color: #0a0a0a; text-decoration: none; margin: 0 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Privacy</a>
                  <span style="color: #cccccc;">•</span>
                  <a href="https://incubazar.com/legal/terms" style="color: #0a0a0a; text-decoration: none; margin: 0 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Terms</a>
                  <span style="color: #cccccc;">•</span>
                  <a href="https://incubazar.com/legal/cookies" style="color: #0a0a0a; text-decoration: none; margin: 0 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Cookies</a>
                </div>
                <p style="margin: 0; font-size: 12px; color: #999999;">
                  © ${new Date().getFullYear()} Incubazar. All rights reserved.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Hello ${name},

You're on the Waitlist! 🎉

Thank you for joining the Incubazar waitlist as a ${userType}!

We've received your application and our team will review it shortly.

What Happens Next?
1. Admin Review - Our team reviews your application (typically within 24-48 hours)
2. Approval Email - You'll receive an email with your verification code
3. Start Connecting - Complete registration and begin your journey!

Keep an eye on your inbox for the approval email with your verification code!

Have questions? Contact us at support@incubazar.com

© ${new Date().getFullYear()} Incubazar. All rights reserved.`
    });

    if (error) {
      console.error('❌ RESEND ERROR (Waitlist Confirmation):', JSON.stringify(error, null, 2));
      return false;
    }

    console.log('✅ WAITLIST CONFIRMATION EMAIL SENT!');
    console.log('Response:', JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Waitlist confirmation error:', error);
    return false;
  }
}

// Admin notification
export async function sendAdminWaitlistNotification({ waitlistEntry }: any) {
  try {
    console.log(`📧 SENDING ADMIN NOTIFICATION about ${waitlistEntry.email}`);
    
    await resend.emails.send({
      from: 'Incubazar System <system@incubazar.com>',
      to: [process.env.ADMIN_EMAIL || 'admin@incubazar.com'],
      subject: `🆕 New Waitlist Application - ${waitlistEntry.full_name} (${waitlistEntry.user_type})`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
            </style>
          </head>
          <body style="margin: 0; padding: 0; background: #f5f5f5; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <!-- Header -->
              <div style="background: #0a0a0a; border-radius: 0; padding: 32px; text-align: center;">
                <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 28px; font-weight: 700; color: #ffffff;">
                  New Waitlist Application
                </h1>
                <p style="margin: 12px 0 0 0; font-size: 14px; color: #cccccc; text-transform: uppercase; letter-spacing: 1.5px;">
                  Action Required
                </p>
              </div>

              <!-- Main Content -->
              <div style="background: #ffffff; padding: 40px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                <!-- User Type Badge -->
                <div style="text-align: center; margin-bottom: 32px;">
                  <div style="display: inline-block; background: #0a0a0a; color: #ffffff; padding: 10px 24px;">
                    <span style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                      ${waitlistEntry.user_type === 'founder' ? 'FOUNDER' : 'INVESTOR'}
                    </span>
                  </div>
                </div>

                <!-- Applicant Details -->
                <div style="background: #f8f9fa; border-left: 3px solid #0a0a0a; padding: 24px; margin-bottom: 24px;">
                  <h3 style="margin: 0 0 20px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 20px; color: #0a0a0a; font-weight: 700;">
                    Applicant Details
                  </h3>
                  
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; font-weight: 700; color: #0a0a0a; font-size: 13px; width: 140px; text-transform: uppercase; letter-spacing: 0.5px;">Name:</td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #0a0a0a; font-size: 16px; font-weight: 600;">${waitlistEntry.full_name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; font-weight: 700; color: #0a0a0a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email:</td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #0a0a0a; font-size: 15px;">
                        <a href="mailto:${waitlistEntry.email}" style="color: #0a0a0a; text-decoration: underline;">${waitlistEntry.email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; font-weight: 700; color: #0a0a0a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Type:</td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #0a0a0a; font-size: 15px; text-transform: capitalize;">${waitlistEntry.user_type}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; font-weight: 700; color: #0a0a0a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Applied:</td>
                      <td style="padding: 12px 0; color: #0a0a0a; font-size: 15px;">${new Date(waitlistEntry.created_at || Date.now()).toLocaleString()}</td>
                    </tr>
                  </table>
                </div>

                ${waitlistEntry.startup_name || waitlistEntry.business_idea ? `
                  <!-- Additional Info -->
                  <div style="background: #f5f5f5; border: 2px solid #0a0a0a; padding: 24px; margin-bottom: 24px;">
                    <h3 style="margin: 0 0 16px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 18px; color: #0a0a0a; font-weight: 700;">
                      Additional Information
                    </h3>
                    ${waitlistEntry.startup_name ? `
                      <p style="margin: 0 0 12px 0; font-size: 14px; color: #0a0a0a;">
                        <strong style="text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Startup Name:</strong><br/>
                        <span style="font-size: 16px; font-weight: 600;">${waitlistEntry.startup_name}</span>
                      </p>
                    ` : ''}
                    ${waitlistEntry.business_idea ? `
                      <p style="margin: 0; font-size: 14px; color: #0a0a0a;">
                        <strong style="text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Business Idea:</strong><br/>
                        <span style="color: #333; line-height: 1.6; font-size: 15px;">${waitlistEntry.business_idea}</span>
                      </p>
                    ` : ''}
                  </div>
                ` : ''}

                <!-- CTA Button -->
                <div style="text-align: center; margin-top: 32px; padding-top: 32px; border-top: 2px solid #e0e0e0;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/waitlist" style="display: inline-block; background: #0a0a0a; color: #ffffff; padding: 18px 48px; text-decoration: none; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                    Review Application →
                  </a>
                  <p style="margin: 16px 0 0 0; font-size: 13px; color: #666666;">
                    Click to review and approve/reject this application
                  </p>
                </div>
              </div>

              <!-- Footer -->
              <div style="background: #ffffff; padding: 24px; text-align: center; border-top: 1px solid #e0e0e0;">
                <p style="margin: 0 0 8px 0; font-size: 12px; color: #999999;">
                  Automated notification from Incubazar Admin System
                </p>
                <p style="margin: 0; font-size: 12px; color: #999999;">
                  © ${new Date().getFullYear()} Incubazar. All rights reserved.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `New Waitlist Application

Name: ${waitlistEntry.full_name}
Email: ${waitlistEntry.email}
Type: ${waitlistEntry.user_type}
${waitlistEntry.startup_name ? `Startup: ${waitlistEntry.startup_name}` : ''}
${waitlistEntry.business_idea ? `Idea: ${waitlistEntry.business_idea}` : ''}

Review Application: ${process.env.NEXT_PUBLIC_APP_URL}/admin/waitlist

© ${new Date().getFullYear()} Incubazar. All rights reserved.`
    });
    return true;
  } catch (error) {
    console.error('Admin notification error:', error);
    return false;
  }
}
