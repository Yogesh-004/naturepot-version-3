# 🌿 NaturePot Challenge

Transform Waste into Green Classrooms! An eco-friendly initiative encouraging students to create beautiful plant pots from recycled materials.

## 📱 Application Overview

The NaturePot webapp is a 4-page React application that allows students to:
1. Learn about the eco-friendly initiative
2. Choose their recycled material type
3. Register with their details
4. Receive confirmation and join the community

## 🚀 Features

### 🏠 Home Page
- Engaging hero section with animations
- Sample pot ideas with difficulty ratings
- Clear call-to-action to get started

### 🎨 Material Selection Page
- Interactive material cards (Plastic Bottles, Thread, Shoes, Metal Cans, Cardboard, Other)
- Single selection with visual feedback
- Progress indicators

### 📝 Registration Page
- Comprehensive form with real-time validation
- Auto-save functionality to prevent data loss
- Mobile-responsive layout
- Field-by-field error handling

### ✅ Confirmation Page
- Registration ID generation
- Downloadable confirmation
- WhatsApp group integration
- Next steps timeline

## 🛠 Technology Stack

### Frontend
- **React.js** with Vite for fast development
- **React Router** for page navigation
- **Tailwind CSS** for colorful, playful styling
- **React Hook Form** for form handling
- **Lucide React** for icons

### Backend & Deployment
- **Vercel** for hosting
- **Serverless functions** for API endpoints
- **Rate limiting** for registration protection

## 📦 Project Structure

```
naturepot/
├── public/                     # Static assets
├── src/
│   ├── components/            # Reusable React components
│   │   ├── Layout/           # Header, Footer, Navigation
│   │   ├── Home/             # Home page components
│   │   ├── MaterialSelection/ # Material selection components
│   │   ├── Registration/     # Registration form components
│   │   └── Confirmation/     # Confirmation page components
│   ├── pages/                # Page components
│   ├── utils/                # Utility functions
│   │   ├── validation.js     # Form validation logic
│   │   └── storage.js        # LocalStorage helpers
│   └── styles/               # Global styles
├── api/                      # Serverless API endpoints
└── dist/                     # Built application
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd naturepot
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your actual values
```

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser

## 📋 Environment Variables

Create a `.env.local` file with the following variables:

```env
# WhatsApp group link for community
VITE_WHATSAPP_GROUP_URL=https://chat.whatsapp.com/YOUR_LINK

# Registration deadline
VITE_REGISTRATION_DEADLINE=2024-11-30

# Contact email for support
VITE_CONTACT_EMAIL=naturepot@college.edu
```

## 🎯 Key Features

### Form Validation
- Real-time field validation
- Custom error messages
- Input sanitization
- Year of study format validation

### User Experience
- Responsive design for mobile and desktop
- Auto-save form drafts
- Progress indicators
- Smooth animations and transitions
- Accessibility considerations

### Security
- Rate limiting on registration endpoint
- Input validation and sanitization
- XSS prevention
- CORS configuration

## 📱 Mobile Responsiveness

The application is fully responsive with:
- Touch-friendly buttons (min 44px)
- Readable font sizes (min 16px)
- Single-column layout on mobile
- Optimized form layouts
- Fast loading performance

## 🔧 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🚀 Deployment

The application is configured for Vercel deployment:

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### Manual Deployment
```bash
npm run build
# Deploy the `dist` folder to your hosting provider
```

## 🧪 Testing

### Manual Testing Checklist

#### Home Page
- [ ] Hero section loads correctly
- [ ] Sample pot cards display properly
- [ ] CTA button navigates to materials page
- [ ] Mobile responsive layout works

#### Material Selection
- [ ] All 6 material options display
- [ ] Single selection works
- [ ] Visual feedback on selection
- [ ] Continue button enables only after selection
- [ ] Back navigation works

#### Registration Form
- [ ] All required fields present
- [ ] Real-time validation triggers
- [ ] Form submission works
- [ ] Error messages display correctly
- [ ] Auto-save functionality works

#### Confirmation Page
- [ ] Registration ID displays
- [ ] WhatsApp group link works
- [ ] Download functionality works
- [ ] All registration details shown

## 🔄 API Endpoints

### POST /api/register
Handles student registration submissions.

**Request Body:**
```json
{
  "name": "string",
  "rollNumber": "string",
  "department": "string",
  "yearOfStudy": "string",
  "email": "string",
  "phone": "string",
  "selectedMaterial": "string",
  "ideaDescription": "string"
}
```

**Response (201 Success):**
```json
{
  "success": true,
  "data": {
    "id": "NP2024-00123",
    "message": "Registration successful"
  }
}
```

## 🎨 Customization

### Branding
- Update colors in `tailwind.config.js`
- Modify logo and icons in components
- Adjust animations and transitions

### Content
- Update text content in page components
- Modify sample pot examples
- Adjust validation rules in `utils/validation.js`

## 🔐 Security Considerations

- Input validation on both client and server
- Rate limiting to prevent abuse
- No sensitive data stored in localStorage
- Secure API communication
- XSS prevention measures

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of an educational eco-friendly initiative.

## 🙋‍♂️ Support

For questions or support:
- Email: naturepot@college.edu
- WhatsApp Group: Available after registration

---

🌿 **Transform Waste into Green Classrooms!** ♻️