# PC Builder

A modern web application for building, exploring, and sharing custom PC configurations. Create your perfect PC build by selecting components, calculating costs, and discovering popular builds from the community.

## 🎯 Features

- **Build Configuration**: Easily create and manage custom PC builds with support for multiple component types (CPU, GPU, RAM, Motherboard, SSD, PSU, Case)
- **Component Management**: Browse and select from a comprehensive database of PC components with real-time pricing
- **Build Sharing**: Publish builds publicly and explore popular community builds
- **Social Features**: Like and discover builds from other users
- **User Authentication**: Secure user accounts with NextAuth integration
- **Real-time Calculations**: Automatic total price calculation for builds
- **Responsive Design**: Fully responsive UI optimized for desktop and mobile devices
- **Dark Mode Support**: Built-in theme switching with next-themes

## 🛠️ Tech Stack

- **Frontend**: React 19, Next.js 16, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui components, Framer Motion animations
- **Backend**: Next.js App Router, NextAuth 5
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with bcrypt password hashing
- **Icons**: Lucide React
- **Utilities**: Clsx, Tailwind Merge

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pc-builder
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/pc_builder

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

### 4. Set Up the Database

Run Prisma migrations to set up your database schema:

```bash
npx prisma migrate dev
```

This will:
- Create the necessary database tables
- Apply all pending migrations
- Generate the Prisma client

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
pc-builder/
├── app/                      # Next.js App Router pages
│   ├── api/                 # API routes (auth, etc.)
│   ├── builds/              # Build browser and editor pages
│   ├── dashboard/           # User dashboard
│   ├── login/               # Authentication pages
│   ├── signup/
│   ├── settings/            # User settings
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── ui/                  # Shadcn UI components
│   └── *.tsx                # Feature components
├── lib/                     # Utility functions and helpers
│   ├── db.ts                # Database utilities
│   ├── types.ts             # TypeScript type definitions
│   ├── builds.ts            # Build-related logic
│   └── generated/           # Generated Prisma types
├── prisma/                  # Database schema and migrations
│   ├── schema.prisma        # Prisma schema
│   ├── migrations/          # Migration history
│   └── seed.ts              # Database seeding script
├── public/                  # Static assets
└── types/                   # Global TypeScript types
```

## 🗄️ Database Schema

The application uses the following main models:

- **User**: User accounts with authentication credentials
- **Build**: PC configurations owned by users
- **Component**: Individual PC components (CPU, GPU, RAM, etc.)
- **BuildComponent**: Junction table linking components to builds
- **Like**: User likes on public builds

## 🔐 Authentication

The app uses NextAuth.js for authentication with:
- Email/password authentication
- Password hashing with bcrypt
- Secure session management

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🎨 Styling

This project uses:
- **Tailwind CSS v4** for utility-first styling
- **Shadcn/ui** for pre-built accessible components
- **Framer Motion** for smooth animations and transitions
- **Next-themes** for dark mode support

## 🐳 Docker Support

The project includes Docker configuration:

```bash
docker-compose up
```

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost/db` |
| `NEXTAUTH_URL` | Application URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Secret key for NextAuth | `random-secret-key` |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📄 License

This project is licensed under the MIT License.
