# WordPress Frontend with Next.js

## Purpose

This project serves as a modern, performant frontend for a WordPress blog using Next.js. By decoupling the frontend from WordPress, we achieve several benefits:

1. Improved Performance: Next.js provides server-side rendering and static site generation capabilities, resulting in faster page loads and better user experience.
2. Enhanced Developer Experience: Utilizing React and TypeScript allows for a more maintainable and scalable codebase.
3. Customization: Full control over the frontend allows for custom designs and features that may be challenging to implement in a traditional WordPress theme.
4. Improved Security: By separating the frontend, we reduce the attack surface of the WordPress installation.

## Features

- Server-side rendered blog posts
- Pagination for blog listings
- Individual post pages
- Comments system integrated with WordPress
- Responsive design using Tailwind CSS
- GraphQL integration for efficient data fetching

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Apollo Client (for GraphQL)
- WordPress (headless CMS)
- WPGraphQL (WordPress plugin)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file with the following variables:
   ```
   WORDPRESS_URL=your_wordpress_site_url
   WORDPRESS_API_TOKEN=your_api_token
   ```
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `src/app/`: Next.js app router pages and API routes
- `src/components/`: Reusable React components
- `src/lib/`: Utility functions and configurations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.