# SchoolMS - School Management System

A complete, production-ready school management system built with Next.js 16, PWA, and Supabase. This mobile-first application enables students and teachers to manage academics, attendance, schedules, and exams seamlessly.

## Features

### Core Features
- **User Authentication**: Secure email/password authentication with role-based access (Student/Teacher)
- **PWA Support**: Full Progressive Web App support with offline capabilities and service worker
- **Responsive Design**: Mobile-first design using Tailwind CSS and shadcn/ui components
- **Real-time Updates**: Supabase integration for real-time data synchronization
- **Row Level Security**: Database-level security with Supabase RLS policies

### Student Features
- **Attendance Tracking**: View personal attendance records with statistics
- **Class Schedule**: Weekly timetable with subjects and teachers
- **Exam Management**: View upcoming and completed exams
- **Marks Tracking**: View exam results with performance analysis

### Teacher Features
- **Mark Attendance**: Bulk mark attendance for entire classes
- **Manage Classes**: View enrolled students and class details
- **Exam Management**: Create exams and enter student marks
- **Schedule Management**: View personal teaching schedule

### Additional Features
- **Notifications System**: Real-time notifications for attendance, exams, and marks
- **User Profiles**: Manage personal information and settings
- **Dashboard**: Role-specific dashboard with quick stats

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Database**: Supabase (PostgreSQL with RLS)
- **Authentication**: Supabase Auth
- **PWA**: Service Workers, Web Manifest
- **Deployment**: Vercel

## Project Structure

\`\`\`
.
├── app/
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard
│   ├── student/           # Student features
│   ├── teacher/           # Teacher features
│   ├── notifications/     # Notifications page
│   ├── settings/          # User settings
│   ├── layout.tsx         # Root layout with PWA setup
│   └── page.tsx           # Landing/redirect page
├── components/
│   ├── navbar.tsx         # Top navigation bar
│   ├── sidebar.tsx        # Side navigation
│   └── ui/                # shadcn/ui components
├── lib/
│   └── supabase/          # Supabase clients and utilities
├── public/
│   ├── manifest.json      # PWA manifest
│   ├── sw.js              # Service worker
│   └── icons/             # App icons
├── scripts/
│   └── 001_create_tables.sql  # Database schema
└── middleware.ts          # Authentication middleware
\`\`\`

## Setup Instructions

### 1. Prerequisites
- Node.js 18+
- Supabase project
- Vercel account (for deployment)

### 2. Environment Variables

Add these to your `.env.local`:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
\`\`\`

### 3. Database Setup

The database schema is ready to run:

1. Connect your Supabase project
2. Run the migration script: `scripts/001_create_tables.sql`
3. This creates all tables with RLS policies

### 4. Running Locally

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
\`\`\`

Visit `http://localhost:3000`

## User Roles

### Student
- Login/Signup with student role
- View attendance records
- Check class schedule
- View exams and results
- Track marks and performance

### Teacher
- Login/Signup with teacher role
- Mark attendance for classes
- View assigned classes
- Create and manage exams
- Enter student marks
- View teaching schedule

## Database Schema

### Core Tables
- **profiles**: Extended user data (role, full name, phone)
- **classes**: Class information (name, grade, section, teacher)
- **enrollments**: Student-class mappings
- **schedules**: Class timetables
- **attendance**: Attendance records
- **exams**: Exam information
- **marks**: Student exam marks
- **notifications**: User notifications

All tables use Row Level Security for data protection.

## Security Features

- **Authentication**: Supabase email/password auth with email verification
- **Authorization**: Role-based access control (Student/Teacher)
- **Database Security**: Row Level Security (RLS) policies
- **Data Privacy**: Users only see their own data
- **Session Management**: Automatic token refresh via middleware

## PWA Features

- **Offline Support**: Service worker caches essential assets
- **Add to Home Screen**: Install as standalone app
- **App Icons**: Multiple sizes for different devices
- **Manifest**: Complete PWA manifest configuration
- **Theme Color**: Customizable theme color

## Performance Optimizations

- Server-side rendering for initial page load
- Image optimization
- CSS-in-JS with Tailwind v4
- Efficient database queries with Supabase
- Service worker for caching

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

\`\`\`bash
vercel
\`\`\`

### Configure Supabase Integration

1. In Vercel project settings
2. Connect Supabase integration
3. Select your Supabase project
4. Environment variables will be auto-configured

## API Routes

The app uses server-side functions in the app directory. No traditional API routes are needed.

## Testing

To test locally:

1. **Test Student Flow**:
   - Signup as student
   - View attendance, schedule, exams
   - Check notifications

2. **Test Teacher Flow**:
   - Signup as teacher
   - Create/view classes
   - Mark attendance
   - Create exams and enter marks

## Future Enhancements

- SMS/Email notifications
- Parent portal
- Advanced analytics and reports
- Document management
- Library system integration
- Fee management
- Multi-language support
- Dark mode theme

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT

## Support

For issues or questions:
1. Check existing documentation
2. Review Supabase documentation
3. Check Next.js documentation
4. Create an issue on GitHub
