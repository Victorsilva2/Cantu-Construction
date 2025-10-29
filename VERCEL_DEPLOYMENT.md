# Deploying Contact Form to Vercel

## 📋 What You Need to Deploy

Your contact form is now ready for Vercel deployment with these files:
- ✅ `index.html` - Updated with the contact form and custom popup
- ✅ `api/send.js` - Serverless API endpoint for sending emails
- ✅ `package.json` - Updated with nodemailer dependency

## 🚀 Deployment Steps

### 1. Push Your Changes to GitHub

```bash
cd Cantu-Construction
git add .
git commit -m "Add contact form with email functionality"
git push origin main
```

### 2. Connect to Vercel (if not already connected)

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will automatically detect your project

### 3. Configure Environment Variables

**IMPORTANT**: You must add these environment variables in Vercel:

1. In your Vercel project, go to **Settings** → **Environment Variables**
2. Add these two variables:

```
EMAIL_USER = glennquezada14@gmail.com
EMAIL_PASS = stpi faws wvve uane
```

3. Make sure to select **all environments** (Production, Preview, Development)
4. Click **Save**

### 4. Deploy

Vercel will automatically deploy when you push to your repository, or you can trigger a manual deployment from the Vercel dashboard.

### 5. Test Your Deployed Contact Form

1. Visit your Vercel URL (e.g., `https://your-project.vercel.app`)
2. Scroll to the "Contact Us" section
3. Fill out the form and submit
4. Check your email at `glennquezada14@gmail.com`

## ✅ What Works After Deployment

- ✅ Contact form with Name, Email, Phone, and Message fields
- ✅ Custom white popup with navy text
- ✅ Email notifications sent to your Gmail
- ✅ Form validation
- ✅ Success message: "Thank you! Our team will reach out as soon as possible."

## 🔧 Troubleshooting

### If emails don't send:
1. Check that environment variables are set correctly in Vercel
2. Verify the variables are available in all environments
3. Check Vercel function logs for any errors
4. Make sure your Gmail app password is correct

### To check logs:
1. Go to Vercel dashboard
2. Click on your deployment
3. Click on "Functions" tab
4. Check the `/api/send` function logs for any errors

## 📝 Notes

- The `api/send.js` file uses Vercel's serverless functions
- Make sure `nodemailer` is in your dependencies in `package.json` (already added)
- Environment variables are secure and not exposed in your code
- The form works both locally (with local-server.js) and on Vercel (with api/send.js)
