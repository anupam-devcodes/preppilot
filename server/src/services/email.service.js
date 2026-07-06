import nodemailer from "nodemailer";

const hasSmtpConfig = () => {
  return (
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );
};

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendEmail = async ({ to, subject, text, html }) => {
  if (process.env.EMAIL_DEBUG === "true" || !hasSmtpConfig()) {
    console.log("\n================ PREPPILOT EMAIL DEBUG ================");
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(text);
    console.log("========================================================\n");

    return;
  }

  const transporter = createTransporter();

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.SMTP_USER,
    to,
    subject,
    text,
    html,
  });
};

export const sendVerificationEmail = async ({ email, fullName, verificationUrl }) => {
  await sendEmail({
    to: email,
    subject: "Verify your PrepPilot account",
    text: `Hi ${fullName}, verify your PrepPilot account using this link: ${verificationUrl}`,
    html: `
      <h2>Verify your PrepPilot account</h2>
      <p>Hi ${fullName},</p>
      <p>Click the link below to verify your email address:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link will expire in 15 minutes.</p>
    `,
  });
};

export const sendPasswordResetEmail = async ({ email, fullName, resetUrl }) => {
  await sendEmail({
    to: email,
    subject: "Reset your PrepPilot password",
    text: `Hi ${fullName}, reset your PrepPilot password using this link: ${resetUrl}`,
    html: `
      <h2>Reset your PrepPilot password</h2>
      <p>Hi ${fullName},</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link will expire in 10 minutes.</p>
    `,
  });
};