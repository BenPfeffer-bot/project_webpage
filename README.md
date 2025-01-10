# Pour L'intérieur - Site Web

Un site web moderne et élégant pour Pour L'intérieur, une entreprise spécialisée dans l'architecture d'intérieur et la décoration.

## Technologies Utilisées

- **Next.js 14** - Framework React avec Server-Side Rendering
- **TypeScript** - Typage statique pour JavaScript
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Bibliothèque d'animations
- **Nodemailer** - Gestion des emails
- **Heroicons** - Icônes SVG

## Prérequis

- Node.js 18.x ou supérieur
- npm ou yarn
- Un compte SMTP pour l'envoi d'emails (ex: Gmail, SendGrid, etc.)

## Installation

1. Clonez le dépôt :

```bash
git clone [URL_DU_REPO]
cd pour-linterieur
```

2. Installez les dépendances :

```bash
npm install
# ou
yarn install
```

3. Créez un fichier `.env.local` à partir du fichier `.env.example` :

```bash
cp .env.example .env.local
```

4. Configurez les variables d'environnement dans `.env.local` :

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-smtp-password
CONTACT_EMAIL=contact@example.com
```

## Développement Local

Pour lancer le serveur de développement :

```bash
npm run dev
# ou
yarn dev
```

Le site sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Déploiement

### Préparation des Assets

1. Préparez les icônes nécessaires :
   - `public/favicon.ico` - Favicon classique
   - `public/icon.png` - Icône principale (512x512px)
   - `public/icon-192.png` - Icône PWA (192x192px)
   - `public/icon-512.png` - Icône PWA (512x512px)
   - `public/apple-icon.png` - Icône pour iOS (180x180px)

2. Optimisez toutes les images du site :

   ```bash
   # Exemple avec Sharp
   npm install -g sharp-cli
   sharp -i ./public/pics/* -o ./public/pics/ -q 85
   ```

### Déploiement sur Vercel (Recommandé)

1. Créez un compte sur [Vercel](https://vercel.com) si ce n'est pas déjà fait.

2. Installez Vercel CLI :

```bash
npm install -g vercel
```

3. Connectez-vous à votre compte Vercel :

```bash
vercel login
```

4. Déployez le projet :

```bash
vercel
```

5. Configurez les variables d'environnement dans l'interface Vercel :
   - Allez dans les paramètres du projet
   - Ajoutez les variables d'environnement listées dans `.env.example`
   - Redéployez le projet si nécessaire

### Configuration des Emails

Le site utilise Nodemailer pour l'envoi d'emails via SMTP. Assurez-vous de :

1. Avoir un compte SMTP valide (Gmail, SendGrid, etc.)
2. Configurer correctement les variables d'environnement SMTP
3. Si vous utilisez Gmail :
   - Activez "l'accès aux applications moins sécurisées" ou
   - Utilisez un "mot de passe d'application"

## Maintenance

### Mise à Jour des Images

Les images sont stockées dans le dossier `public/pics`. Pour mettre à jour une image :

1. Ajoutez la nouvelle image dans le dossier approprié
2. Optimisez l'image pour le web (format WebP recommandé)
3. Mettez à jour les références dans le code si nécessaire

### Mise à Jour du Contenu

Le contenu est principalement géré dans les composants React. Les fichiers principaux sont :

- `src/app/page.tsx` - Page d'accueil
- `src/app/services/page.tsx` - Page des services
- `src/app/realisations/page.tsx` - Page des réalisations
- `src/app/qui-sommes-nous/page.tsx` - Page "Qui sommes-nous"

## Bonnes Pratiques

- Testez toujours les modifications en local avant de déployer
- Optimisez les images avant de les ajouter au projet
- Maintenez les dépendances à jour avec `npm audit` et `npm update`
- Vérifiez la compatibilité mobile de toutes les modifications
- Testez les formulaires de contact après chaque déploiement

## Support

Pour toute question ou problème :

1. Vérifiez la documentation
2. Consultez les logs d'erreur dans la console
3. Contactez l'équipe de développement

## Licence

Tous droits réservés - Pour L'intérieur
