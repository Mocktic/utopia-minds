# Utopia Minds Blog - Deployment Guide

This guide will help you deploy the Utopia Minds blog to Vercel with MongoDB Atlas.

## Prerequisites

1. **MongoDB Atlas Account**: Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Vercel Account**: Create a free account at [Vercel](https://vercel.com)
3. **Node.js**: Version 18 or higher

## MongoDB Atlas Setup

### 1. Create a Cluster

1. Log in to MongoDB Atlas
2. Create a new project (e.g., "Utopia Minds Blog")
3. Create a new cluster (free tier is sufficient)
4. Wait for the cluster to be created

### 2. Configure Database Access

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a user with "Read and write to any database" permissions
4. Save the username and password (you'll need these later)

### 3. Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Select "Allow access from anywhere" (0.0.0.0/0) for Vercel deployment
4. Confirm the changes

### 4. Get Connection String

1. Go to "Clusters" and click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `utopia-minds`

Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/utopia-minds?retryWrites=true&w=majority`

## Local Development Setup

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd utopia-minds-blog
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/utopia-minds?retryWrites=true&w=majority

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-complex-at-least-32-characters

# App URL (for local development)
NUXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Create Admin User

Run the admin creation script:

```bash
node scripts/create-admin.js
```

Follow the prompts to create your admin user.

### 4. Start Development Server

```bash
npm run dev
```

Visit:
- Public site: http://localhost:3000
- Admin login: http://localhost:3000/admin/login

## Vercel Deployment

### 1. Push to GitHub

1. Create a new repository on GitHub
2. Push your code to the repository

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Nuxt.js
   - Build Command: `npm run build`
   - Output Directory: `.output/public`

### 3. Environment Variables

In Vercel project settings, add these environment variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/utopia-minds?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-complex-at-least-32-characters
NUXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### 4. Deploy

Click "Deploy" and wait for the deployment to complete.

### 5. Create Admin User (Production)

After deployment, you can create an admin user by:

1. Clone the repo locally
2. Set the production `MONGODB_URI` in your local `.env`
3. Run `node scripts/create-admin.js`

Or use Vercel's serverless function approach (advanced).

## Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Follow Vercel's instructions to configure DNS
4. Update `NUXT_PUBLIC_APP_URL` environment variable with your custom domain

## Post-Deployment Checklist

- [ ] MongoDB Atlas cluster is running
- [ ] Database user has correct permissions
- [ ] Network access allows Vercel IPs
- [ ] Environment variables are set in Vercel
- [ ] Admin user is created
- [ ] Can login to admin panel
- [ ] Can create and publish blog posts
- [ ] Public blog pages are working
- [ ] SEO meta tags are working
- [ ] Social sharing works

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check connection string format
   - Verify username/password
   - Ensure network access is configured

2. **JWT Token Issues**
   - Ensure JWT_SECRET is set and consistent
   - Check token expiration

3. **Build Errors**
   - Check Node.js version (18+)
   - Clear node_modules and reinstall
   - Check for TypeScript errors

4. **Admin Login Issues**
   - Verify admin user was created successfully
   - Check MongoDB user collection
   - Verify password hashing

### Logs and Debugging

- Vercel Function Logs: Available in Vercel dashboard
- MongoDB Logs: Available in Atlas dashboard
- Local Development: Check browser console and terminal

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to git
2. **JWT Secret**: Use a strong, random secret (32+ characters)
3. **MongoDB**: Use strong passwords and limit network access
4. **Admin Access**: Only create admin users for trusted individuals
5. **HTTPS**: Always use HTTPS in production (Vercel provides this)

## Maintenance

### Regular Tasks

1. **Backup Database**: MongoDB Atlas provides automated backups
2. **Update Dependencies**: Regularly update npm packages
3. **Monitor Performance**: Use Vercel analytics
4. **Security Updates**: Keep dependencies updated

### Scaling

- MongoDB Atlas: Upgrade cluster as needed
- Vercel: Automatically scales serverless functions
- CDN: Vercel provides global CDN automatically

## Support

For issues with:
- **Vercel**: Check [Vercel Documentation](https://vercel.com/docs)
- **MongoDB Atlas**: Check [MongoDB Documentation](https://docs.atlas.mongodb.com/)
- **Nuxt.js**: Check [Nuxt Documentation](https://nuxt.com/docs)

## Additional Features

Consider adding:
- Newsletter integration (Mailchimp, ConvertKit)
- Analytics (Google Analytics, Plausible)
- Comments system (Disqus, custom)
- Search functionality (Algolia)
- Image optimization (Cloudinary)
- Email notifications for new posts