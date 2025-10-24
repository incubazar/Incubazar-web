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
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap');
            </style>
          </head>
          <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%); font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <!-- Header with Premium Gradient -->
              <div style="text-align: center; margin-bottom: 48px;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3); margin-bottom: 24px;">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.9"/>
                    <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <h1 style="margin: 0; font-family: 'Sora', sans-serif; font-size: 32px; font-weight: 700; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                  Welcome to Incubazar
                </h1>
                <p style="margin: 12px 0 0 0; font-size: 16px; color: #a0a0b0;">
                  Your Gateway to Strategic Connections
                </p>
              </div>

              <!-- Main Content Card -->
              <div style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 40px; margin-bottom: 32px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);">
                <div style="text-align: center; margin-bottom: 32px;">
                  <div style="display: inline-block; background: rgba(102, 126, 234, 0.1); border: 2px solid rgba(102, 126, 234, 0.2); border-radius: 12px; padding: 12px 24px; margin-bottom: 24px;">
                    <span style="color: #667eea; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">✅ Application Approved</span>
                  </div>
                </div>

                <p style="margin: 0 0 24px 0; font-size: 18px; color: #ffffff; line-height: 1.6; text-align: center;">
                  Hello <strong style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${name}</strong> 👋
                </p>
                
                <p style="margin: 0 0 32px 0; font-size: 16px; color: #c0c0d0; line-height: 1.7; text-align: center;">
                  Your application has been approved! Here's your verification code to complete your registration and start connecting with ${userType === 'founder' ? 'investors' : 'innovative startups'}:
                </p>
                
                <!-- OTP Code with Premium Design -->
                <div style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%); border: 2px solid rgba(102, 126, 234, 0.3); border-radius: 20px; padding: 40px; text-align: center; margin: 40px 0; position: relative; overflow: hidden;">
                  <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%); pointer-events: none;"></div>
                  <p style="margin: 0 0 16px 0; font-size: 14px; color: #a0a0b0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Your Verification Code</p>
                  <div style="font-size: 56px; font-weight: 800; letter-spacing: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-family: 'Sora', 'Courier New', monospace; position: relative;">
                    ${otp}
                  </div>
                  <div style="margin-top: 20px; padding: 12px 24px; background: rgba(255, 152, 0, 0.1); border: 1px solid rgba(255, 152, 0, 0.3); border-radius: 8px; display: inline-block;">
                    <p style="margin: 0; font-size: 14px; color: #ffa726; font-weight: 600;">
                      ⏱️ Expires in 30 minutes
                    </p>
                  </div>
                </div>

                <!-- CTA Button -->
                <div style="text-align: center; margin-top: 32px;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/register" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 18px 48px; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                    Complete Registration →
                  </a>
                </div>
              </div>

              <!-- Instructions Card -->
              <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 32px; margin-bottom: 32px;">
                <h3 style="margin: 0 0 20px 0; font-family: 'Sora', sans-serif; font-size: 20px; color: #ffffff; font-weight: 600;">Quick Start Guide</h3>
                <div style="display: table; width: 100%;">
                  <div style="display: table-row;">
                    <div style="display: table-cell; padding: 12px 0; vertical-align: top; width: 40px;">
                      <span style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white; font-weight: 700; font-size: 14px;">1</span>
                    </div>
                    <div style="display: table-cell; padding: 12px 0 12px 16px; color: #c0c0d0; font-size: 15px; line-height: 1.6;">
                      Click the button above or visit <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/register" style="color: #667eea; text-decoration: none; font-weight: 600;">incubazar.com/auth/register</a>
                    </div>
                  </div>
                  <div style="display: table-row;">
                    <div style="display: table-cell; padding: 12px 0; vertical-align: top; width: 40px;">
                      <span style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white; font-weight: 700; font-size: 14px;">2</span>
                    </div>
                    <div style="display: table-cell; padding: 12px 0 12px 16px; color: #c0c0d0; font-size: 15px; line-height: 1.6;">
                      Enter your email address: <strong style="color: #ffffff;">${to}</strong>
                    </div>
                  </div>
                  <div style="display: table-row;">
                    <div style="display: table-cell; padding: 12px 0; vertical-align: top; width: 40px;">
                      <span style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white; font-weight: 700; font-size: 14px;">3</span>
                    </div>
                    <div style="display: table-cell; padding: 12px 0 12px 16px; color: #c0c0d0; font-size: 15px; line-height: 1.6;">
                      Enter the verification code shown above
                    </div>
                  </div>
                  <div style="display: table-row;">
                    <div style="display: table-cell; padding: 12px 0; vertical-align: top; width: 40px;">
                      <span style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white; font-weight: 700; font-size: 14px;">4</span>
                    </div>
                    <div style="display: table-cell; padding: 12px 0 12px 16px; color: #c0c0d0; font-size: 15px; line-height: 1.6;">
                      Create a secure password and start exploring
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div style="text-align: center; padding-top: 32px; border-top: 1px solid rgba(255, 255, 255, 0.08);">
                <p style="margin: 0 0 16px 0; font-size: 13px; color: #808090; line-height: 1.6;">
                  🔒 If you didn't request this code, please ignore this email or contact our support team.
                </p>
                <div style="margin: 24px 0;">
                  <a href="https://incubazar.com" style="color: #667eea; text-decoration: none; margin: 0 12px; font-size: 13px;">Website</a>
                  <span style="color: #404050;">•</span>
                  <a href="https://incubazar.com/legal/privacy" style="color: #667eea; text-decoration: none; margin: 0 12px; font-size: 13px;">Privacy</a>
                  <span style="color: #404050;">•</span>
                  <a href="https://incubazar.com/legal/terms" style="color: #667eea; text-decoration: none; margin: 0 12px; font-size: 13px;">Terms</a>
                </div>
                <p style="margin: 16px 0 0 0; font-size: 12px; color: #606070;">
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
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap');
            </style>
          </head>
          <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%); font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <!-- Celebration Header -->
              <div style="text-align: center; margin-bottom: 48px;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3); margin-bottom: 24px; animation: pulse 2s ease-in-out infinite;">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.9"/>
                    <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <h1 style="margin: 0 0 16px 0; font-family: 'Sora', sans-serif; font-size: 36px; font-weight: 700; color: #ffffff;">
                  🎉 Welcome Aboard!
                </h1>
                <p style="margin: 0; font-size: 18px; color: #a0a0b0; line-height: 1.6;">
                  Your account is ready, <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 600;">${name}</span>
                </p>
              </div>

              <!-- Success Message -->
              <div style="background: rgba(76, 175, 80, 0.1); border: 2px solid rgba(76, 175, 80, 0.3); border-radius: 16px; padding: 24px; margin-bottom: 32px; text-align: center;">
                <p style="margin: 0; font-size: 16px; color: #81c784; font-weight: 600;">
                  ✅ Your account has been successfully created!
                </p>
              </div>

              <!-- Main Content -->
              <div style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 40px; margin-bottom: 32px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);">
                <p style="margin: 0 0 24px 0; font-size: 17px; color: #ffffff; line-height: 1.7; text-align: center;">
                  You're now part of <strong style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">India's Premier Matching Platform</strong> connecting ${userType === 'founder' ? 'visionary founders with strategic investors' : 'strategic investors with innovative startups'}!
                </p>

                <!-- CTA Button -->
                <div style="text-align: center; margin: 40px 0;">
                  <a href="${dashboardUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px 56px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 18px; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4); transition: all 0.3s ease; font-family: 'Sora', sans-serif;">
                    Go to Dashboard →
                  </a>
                  <p style="margin: 16px 0 0 0; font-size: 13px; color: #808090;">
                    Or copy this link: <a href="${dashboardUrl}" style="color: #667eea; text-decoration: none;">${dashboardUrl}</a>
                  </p>
                </div>
              </div>

              <!-- Feature Cards -->
              <div style="margin-bottom: 32px;">
                <h2 style="margin: 0 0 24px 0; font-family: 'Sora', sans-serif; font-size: 24px; color: #ffffff; text-align: center; font-weight: 600;">
                  What's Waiting For You
                </h2>
                ${features.map((feature, index) => `
                  <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 24px; margin-bottom: 16px;">
                    <div style="display: table; width: 100%;">
                      <div style="display: table-cell; vertical-align: top; width: 50px;">
                        <span style="font-size: 32px;">${feature.icon}</span>
                      </div>
                      <div style="display: table-cell; vertical-align: top; padding-left: 16px;">
                        <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #ffffff; font-weight: 600;">${feature.title}</h3>
                        <p style="margin: 0; font-size: 14px; color: #c0c0d0; line-height: 1.6;">${feature.desc}</p>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>

              <!-- Quick Tips -->
              <div style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%); border: 1px solid rgba(102, 126, 234, 0.2); border-radius: 16px; padding: 32px; margin-bottom: 32px;">
                <h3 style="margin: 0 0 20px 0; font-family: 'Sora', sans-serif; font-size: 20px; color: #ffffff; font-weight: 600;">
                  💡 Quick Start Tips
                </h3>
                <ul style="margin: 0; padding-left: 24px; color: #c0c0d0; font-size: 15px; line-height: 2;">
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
              <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 24px; text-align: center; margin-bottom: 32px;">
                <p style="margin: 0 0 12px 0; font-size: 16px; color: #ffffff; font-weight: 600;">
                  Need Help Getting Started?
                </p>
                <p style="margin: 0 0 20px 0; font-size: 14px; color: #c0c0d0;">
                  Our team is here to help you make the most of Incubazar
                </p>
                <a href="mailto:support@incubazar.com" style="color: #667eea; text-decoration: none; font-weight: 600; font-size: 15px;">
                  📧 support@incubazar.com
                </a>
              </div>

              <!-- Footer -->
              <div style="text-align: center; padding-top: 32px; border-top: 1px solid rgba(255, 255, 255, 0.08);">
                <div style="margin: 0 0 24px 0;">
                  <a href="https://incubazar.com" style="color: #667eea; text-decoration: none; margin: 0 12px; font-size: 13px;">Website</a>
                  <span style="color: #404050;">•</span>
                  <a href="https://incubazar.com/legal/privacy" style="color: #667eea; text-decoration: none; margin: 0 12px; font-size: 13px;">Privacy</a>
                  <span style="color: #404050;">•</span>
                  <a href="https://incubazar.com/legal/terms" style="color: #667eea; text-decoration: none; margin: 0 12px; font-size: 13px;">Terms</a>
                </div>
                <p style="margin: 0; font-size: 12px; color: #606070;">
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
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap');
            </style>
          </head>
          <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%); font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 48px;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3); margin-bottom: 24px;">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.9"/>
                    <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <h1 style="margin: 0 0 16px 0; font-family: 'Sora', sans-serif; font-size: 36px; font-weight: 700; color: #ffffff;">
                  You're on the List! 🎉
                </h1>
                <p style="margin: 0; font-size: 18px; color: #a0a0b0;">
                  Application Received Successfully
                </p>
              </div>

              <!-- Success Badge -->
              <div style="text-align: center; margin-bottom: 32px;">
                <div style="display: inline-block; background: rgba(76, 175, 80, 0.15); border: 2px solid rgba(76, 175, 80, 0.3); border-radius: 12px; padding: 16px 32px;">
                  <span style="color: #81c784; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">✅ Waitlist Confirmed</span>
                </div>
              </div>

              <!-- Main Content -->
              <div style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 40px; margin-bottom: 32px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);">
                <p style="margin: 0 0 24px 0; font-size: 18px; color: #ffffff; line-height: 1.7; text-align: center;">
                  Hello <strong style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${name}</strong> 👋
                </p>
                
                <p style="margin: 0 0 32px 0; font-size: 16px; color: #c0c0d0; line-height: 1.7; text-align: center;">
                  Thank you for joining the Incubazar waitlist as a <strong style="color: #ffffff; background: rgba(102, 126, 234, 0.2); padding: 2px 8px; border-radius: 4px;">${userType}</strong>! We've received your application and our team will review it shortly.
                </p>

                <!-- Timeline -->
                <div style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%); border: 1px solid rgba(102, 126, 234, 0.2); border-radius: 16px; padding: 32px; margin-bottom: 24px;">
                  <h3 style="margin: 0 0 24px 0; font-family: 'Sora', sans-serif; font-size: 20px; color: #ffffff; font-weight: 600; text-align: center;">
                    ⏱️ What Happens Next?
                  </h3>
                  
                  <div style="position: relative; padding-left: 40px;">
                    <!-- Step 1 -->
                    <div style="position: relative; margin-bottom: 24px;">
                      <div style="position: absolute; left: -40px; top: 0; width: 32px; height: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 14px;">1</div>
                      <div style="padding-left: 8px;">
                        <h4 style="margin: 0 0 8px 0; font-size: 16px; color: #ffffff; font-weight: 600;">Admin Review</h4>
                        <p style="margin: 0; font-size: 14px; color: #c0c0d0; line-height: 1.6;">Our team reviews your application (typically within 24-48 hours)</p>
                      </div>
                    </div>

                    <!-- Step 2 -->
                    <div style="position: relative; margin-bottom: 24px;">
                      <div style="position: absolute; left: -40px; top: 0; width: 32px; height: 32px; background: rgba(102, 126, 234, 0.3); border: 2px solid #667eea; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #667eea; font-weight: 700; font-size: 14px;">2</div>
                      <div style="padding-left: 8px;">
                        <h4 style="margin: 0 0 8px 0; font-size: 16px; color: #ffffff; font-weight: 600;">Approval Email</h4>
                        <p style="margin: 0; font-size: 14px; color: #c0c0d0; line-height: 1.6;">You'll receive an email with your verification code</p>
                      </div>
                    </div>

                    <!-- Step 3 -->
                    <div style="position: relative;">
                      <div style="position: absolute; left: -40px; top: 0; width: 32px; height: 32px; background: rgba(102, 126, 234, 0.3); border: 2px solid #667eea; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #667eea; font-weight: 700; font-size: 14px;">3</div>
                      <div style="padding-left: 8px;">
                        <h4 style="margin: 0 0 8px 0; font-size: 16px; color: #ffffff; font-weight: 600;">Start Connecting</h4>
                        <p style="margin: 0; font-size: 14px; color: #c0c0d0; line-height: 1.6;">Complete registration and begin your journey!</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div style="background: rgba(255, 152, 0, 0.1); border: 1px solid rgba(255, 152, 0, 0.3); border-radius: 12px; padding: 20px; text-align: center;">
                  <p style="margin: 0; font-size: 15px; color: #ffb74d; font-weight: 600; line-height: 1.6;">
                    💡 Keep an eye on your inbox for the approval email with your verification code!
                  </p>
                </div>
              </div>

              <!-- Why Incubazar -->
              <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 32px; margin-bottom: 32px;">
                <h3 style="margin: 0 0 24px 0; font-family: 'Sora', sans-serif; font-size: 20px; color: #ffffff; text-align: center; font-weight: 600;">
                  Why Join Incubazar?
                </h3>
                <div style="margin-bottom: 20px;">
                  <div style="display: table; width: 100%; margin-bottom: 16px;">
                    <div style="display: table-cell; vertical-align: top; width: 40px;">
                      <span style="font-size: 24px;">🎯</span>
                    </div>
                    <div style="display: table-cell; vertical-align: top; padding-left: 16px;">
                      <h4 style="margin: 0 0 4px 0; font-size: 16px; color: #ffffff; font-weight: 600;">Smart Matching</h4>
                      <p style="margin: 0; font-size: 14px; color: #c0c0d0; line-height: 1.6;">AI-powered connections between ${userType === 'founder' ? 'startups and investors' : 'investors and startups'}</p>
                    </div>
                  </div>
                  <div style="display: table; width: 100%; margin-bottom: 16px;">
                    <div style="display: table-cell; vertical-align: top; width: 40px;">
                      <span style="font-size: 24px;">🔒</span>
                    </div>
                    <div style="display: table-cell; vertical-align: top; padding-left: 16px;">
                      <h4 style="margin: 0 0 4px 0; font-size: 16px; color: #ffffff; font-weight: 600;">Secure Platform</h4>
                      <p style="margin: 0; font-size: 14px; color: #c0c0d0; line-height: 1.6;">Verified ${userType === 'founder' ? 'investors' : 'startups'} and compliant deal flow</p>
                    </div>
                  </div>
                  <div style="display: table; width: 100%;">
                    <div style="display: table-cell; vertical-align: top; width: 40px;">
                      <span style="font-size: 24px;">⚡</span>
                    </div>
                    <div style="display: table-cell; vertical-align: top; padding-left: 16px;">
                      <h4 style="margin: 0 0 4px 0; font-size: 16px; color: #ffffff; font-weight: 600;">Streamlined Process</h4>
                      <p style="margin: 0; font-size: 14px; color: #c0c0d0; line-height: 1.6;">From discovery to deal closure, all in one place</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Support -->
              <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 24px; text-align: center; margin-bottom: 32px;">
                <p style="margin: 0 0 12px 0; font-size: 16px; color: #ffffff; font-weight: 600;">
                  Have Questions?
                </p>
                <p style="margin: 0 0 16px 0; font-size: 14px; color: #c0c0d0;">
                  Our team is here to help
                </p>
                <a href="mailto:support@incubazar.com" style="color: #667eea; text-decoration: none; font-weight: 600; font-size: 15px;">
                  📧 support@incubazar.com
                </a>
              </div>

              <!-- Footer -->
              <div style="text-align: center; padding-top: 32px; border-top: 1px solid rgba(255, 255, 255, 0.08);">
                <div style="margin: 0 0 24px 0;">
                  <a href="https://incubazar.com" style="color: #667eea; text-decoration: none; margin: 0 12px; font-size: 13px;">Website</a>
                  <span style="color: #404050;">•</span>
                  <a href="https://incubazar.com/legal/privacy" style="color: #667eea; text-decoration: none; margin: 0 12px; font-size: 13px;">Privacy</a>
                  <span style="color: #404050;">•</span>
                  <a href="https://incubazar.com/legal/terms" style="color: #667eea; text-decoration: none; margin: 0 12px; font-size: 13px;">Terms</a>
                </div>
                <p style="margin: 0; font-size: 12px; color: #606070;">
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
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@600;700&display=swap');
            </style>
          </head>
          <body style="margin: 0; padding: 0; background: #f5f5f5; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px 16px 0 0; padding: 32px; text-align: center;">
                <h1 style="margin: 0; font-family: 'Sora', sans-serif; font-size: 28px; font-weight: 700; color: #ffffff;">
                  🆕 New Waitlist Application
                </h1>
                <p style="margin: 12px 0 0 0; font-size: 16px; color: rgba(255, 255, 255, 0.9);">
                  Action Required - Review & Approve
                </p>
              </div>

              <!-- Main Content -->
              <div style="background: #ffffff; padding: 40px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
                <!-- User Type Badge -->
                <div style="text-align: center; margin-bottom: 32px;">
                  <div style="display: inline-block; background: ${waitlistEntry.user_type === 'founder' ? 'rgba(102, 126, 234, 0.1)' : 'rgba(118, 75, 162, 0.1)'}; border: 2px solid ${waitlistEntry.user_type === 'founder' ? '#667eea' : '#764ba2'}; border-radius: 8px; padding: 8px 20px;">
                    <span style="color: ${waitlistEntry.user_type === 'founder' ? '#667eea' : '#764ba2'}; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                      ${waitlistEntry.user_type === 'founder' ? '🚀 Founder' : '💼 Investor'}
                    </span>
                  </div>
                </div>

                <!-- Applicant Details -->
                <div style="background: #f8f9fa; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                  <h3 style="margin: 0 0 20px 0; font-family: 'Sora', sans-serif; font-size: 18px; color: #1a1a1a; font-weight: 600;">
                    👤 Applicant Details
                  </h3>
                  
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; font-weight: 600; color: #666; font-size: 14px; width: 140px;">Full Name:</td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #1a1a1a; font-size: 15px; font-weight: 600;">${waitlistEntry.full_name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; font-weight: 600; color: #666; font-size: 14px;">Email:</td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #1a1a1a; font-size: 15px;">
                        <a href="mailto:${waitlistEntry.email}" style="color: #667eea; text-decoration: none;">${waitlistEntry.email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; font-weight: 600; color: #666; font-size: 14px;">User Type:</td>
                      <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0; color: #1a1a1a; font-size: 15px; text-transform: capitalize;">${waitlistEntry.user_type}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; font-weight: 600; color: #666; font-size: 14px;">Applied:</td>
                      <td style="padding: 12px 0; color: #1a1a1a; font-size: 15px;">${new Date(waitlistEntry.created_at || Date.now()).toLocaleString()}</td>
                    </tr>
                  </table>
                </div>

                ${waitlistEntry.startup_name || waitlistEntry.business_idea ? `
                  <!-- Additional Info -->
                  <div style="background: #fff3e0; border-left: 4px solid #ff9800; border-radius: 4px; padding: 20px; margin-bottom: 24px;">
                    <h3 style="margin: 0 0 12px 0; font-family: 'Sora', sans-serif; font-size: 16px; color: #e65100; font-weight: 600;">
                      📋 Additional Information
                    </h3>
                    ${waitlistEntry.startup_name ? `
                      <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">
                        <strong style="color: #e65100;">Startup Name:</strong> ${waitlistEntry.startup_name}
                      </p>
                    ` : ''}
                    ${waitlistEntry.business_idea ? `
                      <p style="margin: 0; font-size: 14px; color: #666;">
                        <strong style="color: #e65100;">Business Idea:</strong><br>
                        <span style="color: #333; line-height: 1.6;">${waitlistEntry.business_idea}</span>
                      </p>
                    ` : ''}
                  </div>
                ` : ''}

                <!-- CTA Button -->
                <div style="text-align: center; margin-top: 32px; padding-top: 32px; border-top: 2px solid #f0f0f0;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/waitlist" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3); font-family: 'Sora', sans-serif;">
                    Review Application →
                  </a>
                  <p style="margin: 16px 0 0 0; font-size: 13px; color: #999;">
                    Click to review and approve/reject this application
                  </p>
                </div>
              </div>

              <!-- Footer -->
              <div style="background: #ffffff; border-radius: 0 0 16px 16px; padding: 24px; text-align: center; border-top: 1px solid #e0e0e0;">
                <p style="margin: 0; font-size: 12px; color: #999;">
                  This is an automated notification from Incubazar Admin System
                </p>
                <p style="margin: 8px 0 0 0; font-size: 12px; color: #999;">
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
