# Bank CRM Application

A comprehensive customer relationship management solution designed specifically for financial institutions. Built with Next.js and Material UI, this modern web application enables bank staff to efficiently manage client relationships, track opportunities, and streamline workflows.

## Project Overview
The Bank CRM provides bank staff with tools to manage client relationships, track opportunities, handle documents, and streamline workflows. It offers a responsive interface with both light and dark mode options, ensuring accessibility across various devices.

## Implemented Features
1. **Dashboard**: Main overview with KPIs, recent customers, opportunities, and upcoming tasks
2. **Customers**: Customer management with profiles and detailed information
3. **Opportunities**: Sales pipeline and deal tracking
4. **Calendar & Tasks**: Calendar view with integrated task management
5. **Documents**: Document management system for file storage and organization
6. **Reports**: Analytics and reporting tools
7. **Settings**: User preferences and system settings
8. **Login**: Authentication page
9. **Dark/Light Mode**: Theme switching functionality with persistent user preferences

## Project Structure
- `/pages`: Contains all the application pages/routes
- `/components`: Reusable UI components
- `/data/mock`: Mock JSON data for development
- `/types`: TypeScript type definitions
- `/context`: React context providers (includes ThemeContext for dark/light mode)
- `/public`: Static assets
- `/styles`: CSS and styling files
- `/utils`: Utility functions

## Technology Stack
- **Framework**: Next.js 15.2.2
- **Language**: TypeScript 5
- **UI Library**: Material UI 6.4.7
- **State Management**: React Context API
- **React**: React 19.0.0
- **Styling**: Emotion (CSS-in-JS)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Data Structure
The application uses a structured approach with:
- TypeScript interfaces for type safety
- Mock JSON data organized by feature in `/data/mock/`
- Separation of data and UI components

## Deployment

The application is configured for Vercel deployment with appropriate settings in `vercel.json` and `next.config.ts`.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
