interface User {
  name: string;
  email: string;
}

interface EmailTemplate {
  subject: string;
  html: string;
}

const baseTemplate = (content: string, title: string) => `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #f97316, #fbbf24);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .content {
            background: #ffffff;
            padding: 30px;
            border: 1px solid #e5e5e5;
            border-top: none;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 10px 10px;
            color: #6b7280;
            font-size: 14px;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #f97316, #fbbf24);
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            margin: 20px 0;
        }
        .otp-code {
            background: #f3f4f6;
            border: 2px dashed #d1d5db;
            padding: 20px;
            text-align: center;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #374151;
            margin: 20px 0;
            border-radius: 8px;
        }
        .highlight {
            color: #f97316;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">idées3D</div>
        <p>Votre plateforme de conception de plans d'architecture</p>
    </div>
    <div class="content">
        ${content}
    </div>
    <div class="footer">
        <p>© 2025 idées3D. Tous droits réservés.</p>
        <p>Vous recevez cet email car vous avez un compte sur <a href="https://app.idees3d.fr">app.idees3d.fr</a></p>
    </div>
</body>
</html>
`;

export const welcomeEmailTemplate = (user: User): EmailTemplate => {
  const content = `
    <h2>Bienvenue sur idées3D, ${user.name} ! 🎉</h2>
    
    <p>Nous sommes ravis de vous accueillir dans notre communauté de créateurs de plans d'architecture !</p>
    
    <p>Avec votre compte idées3D, vous pouvez maintenant :</p>
    <ul>
        <li><strong>Créer des plans d'architecture</strong> avec notre outil de planification intuitif</li>
        <li><strong>Sauvegarder vos projets</strong> et y accéder depuis n'importe où</li>
        <li><strong>Gérer votre bibliothèque</strong> de plans et modèles</li>
        <li><strong>Partager vos créations</strong> avec d'autres utilisateurs</li>
    </ul>
    
    <div style="text-align: center; margin: 30px 0;">
        <a href="https://app.idees3d.fr/dashboard" class="button">
            Accéder à mon tableau de bord
        </a>
    </div>
    
    <p>Si vous avez des questions ou avez besoin d'aide, n'hésitez pas à nous contacter. Notre équipe est là pour vous accompagner dans vos projets de conception.</p>
    
    <p>Bonne création !</p>
    <p><strong>L'équipe idées3D</strong></p>
  `;

  return {
    subject: "Bienvenue sur idées3D ! Votre compte a été créé avec succès",
    html: baseTemplate(content, "Bienvenue sur idées3D")
  };
};

export const otpEmailTemplate = (otp: string): EmailTemplate => {
  const content = `
    <h2>Réinitialisation de votre mot de passe</h2>
    
    <p>Vous avez demandé à réinitialiser le mot de passe de votre compte idées3D.</p>
    
    <p>Utilisez le code de vérification ci-dessous pour continuer :</p>
    
    <div class="otp-code">
        ${otp}
    </div>
    
    <p><strong>Ce code est valide pendant 10 minutes seulement.</strong></p>
    
    <p>Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email en toute sécurité. Votre mot de passe actuel restera inchangé.</p>
    
    <div style="background: #fef3cd; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
        <p style="margin: 0;"><strong>⚠️ Sécurité :</strong> Ne partagez jamais ce code avec qui que ce soit. L'équipe idées3D ne vous demandera jamais ce code par email ou téléphone.</p>
    </div>
    
    <p>Cordialement,<br><strong>L'équipe idées3D</strong></p>
  `;

  return {
    subject: "Code de vérification - Réinitialisation de mot de passe idées3D",
    html: baseTemplate(content, "Réinitialisation de mot de passe")
  };
};

export const passwordResetSuccessTemplate = (user: User): EmailTemplate => {
  const content = `
    <h2>Votre mot de passe a été modifié avec succès</h2>
    
    <p>Bonjour ${user.name},</p>
    
    <p>Nous vous confirmons que le mot de passe de votre compte idées3D a été <span class="highlight">modifié avec succès</span>.</p>
    
    <p><strong>Détails de la modification :</strong></p>
    <ul>
        <li>Date : ${new Date().toLocaleDateString('fr-FR', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</li>
        <li>Compte : ${user.email}</li>
    </ul>
    
    <p>Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.</p>
    
    <div style="text-align: center; margin: 30px 0;">
        <a href="https://app.idees3d.fr/login" class="button">
            Se connecter maintenant
        </a>
    </div>
    
    <div style="background: #fef3cd; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
        <p style="margin: 0;"><strong>⚠️ Si vous n'avez pas effectué cette modification :</strong> Contactez-nous immédiatement à contact@idees3d.fr</p>
    </div>
    
    <p>Cordialement,<br><strong>L'équipe idées3D</strong></p>
  `;

  return {
    subject: "Confirmation - Mot de passe modifié avec succès",
    html: baseTemplate(content, "Mot de passe modifié")
  };
};