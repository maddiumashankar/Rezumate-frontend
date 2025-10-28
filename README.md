# Rezumate Frontend

A modern, AI-powered resume builder application that helps users create professional resumes with ease. Built with React, TypeScript, and modern UI components.

## Features

- 🎨 **Template Library**: Choose from multiple professional resume templates
- 📝 **Smart Resume Creation**: Create resumes from scratch with guided forms
- 🤖 **AI-Powered Tailoring**: Tailor your resume for specific job descriptions
- 📄 **Resume Upload**: Upload existing resumes and enhance them
- 👀 **Real-time Preview**: See your changes in real-time
- 📱 **Responsive Design**: Works perfectly on all devices
- 🔐 **Authentication**: Secure user authentication and data management

## Getting Started

### Prerequisites

- Node.js 18+ (recommended to use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm or yarn package manager

### Installation

1. Clone the repository:
```sh
git clone https://github.com/maddiumashankar/Rezumate-frontend.git
cd Rezumate-frontend
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn-ui components
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   └── ...
├── pages/              # Application pages
│   ├── Auth.tsx
│   ├── Dashboard.tsx
│   ├── CreateResume.tsx
│   ├── Templates.tsx
│   └── ...
├── hooks/              # Custom React hooks
├── store/              # Zustand state management
├── utils/              # Utility functions
└── lib/                # Library configurations
```

## Tech Stack

This project is built with modern technologies:

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **UI Components**: shadcn-ui (Radix UI primitives)
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: Zustand for lightweight state management
- **HTTP Client**: Axios for API communication
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: Framer Motion for smooth animations
- **Date Handling**: date-fns for date utilities

## Development

### Code Style

This project uses ESLint for code linting. Make sure to run `npm run lint` before committing changes.

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Deployment

The application can be deployed to various platforms:

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Deploy directly from your git repository
- **GitHub Pages**: Use the build output for static hosting

To build for production:
```sh
npm run build
```

The built files will be in the `dist` directory.

## License

This project is private and proprietary.

## Support

For support, please contact the development team or create an issue in the repository.
