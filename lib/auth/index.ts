import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";
import { createAuthMiddleware } from "better-auth/api";
import { getDb, users, sessions, accounts, verifications } from "../db";
import { emailService } from "../email/service";
import { welcomeEmailTemplate, otpEmailTemplate } from "../email/templates";

export const auth = betterAuth({
  database: drizzleAdapter(getDb()!, {
    provider: "pg",
    schema: {
      user: users,
      session: sessions,
      account: accounts,
      verification: verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production
    minPasswordLength: 6,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24, // 24 hours - matches updateAge
    },
  },
  advanced: {
    database: {
      generateId: () => crypto.randomUUID(),
    },
    crossSubDomainCookies: {
      enabled: true,
      domain: process.env.NODE_ENV === 'production' ? '.idees3d.fr' : 'localhost',
    },
  },
  trustedOrigins: [
    "http://localhost:3000",
    "https://app.idees3d.fr",
    "https://3dstudio.idees3d.fr",
    "https://planner.idees3d.fr"
  ],
  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 600, // 10 minutes
      allowedAttempts: 3,
      async sendVerificationOTP({ email, otp, type }) {
        try {
          if (type === "forget-password") {
            const template = otpEmailTemplate(otp);
            await emailService.sendEmail({
              to: email,
              subject: template.subject,
              html: template.html,
            });
          }
        } catch (error) {
          console.error("Erreur envoi OTP:", error);
          throw error;
        }
      },
    }),
  ],
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-up") && ctx.context.newSession) {
        try {
          // Get user from the new session
          const session = ctx.context.newSession;
          const user = session.user;
          
          if (user) {
            const template = welcomeEmailTemplate(user);
            await emailService.sendEmail({
              to: user.email,
              subject: template.subject,
              html: template.html,
            });
            console.log(`Email de bienvenue envoyé à ${user.email}`);
          }
        } catch (error) {
          console.error("Erreur envoi email de bienvenue:", error);
          // Ne pas faire échouer l'inscription si l'email échoue
        }
      }
    }),
  },
});

export type Session = typeof auth.$Infer.Session;