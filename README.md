Welcome to the home of the TAG Website.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Contributing

To contribute to the repository, follow the given steps:
 - Fork this repository
 - Mark the fork as private (Go to your forked repository -> Setting -> Visibility Private)
 - Make your changes to the fork, and open a pull request
 - A maintainer will review the pull request to decide its inclusion into the main repository

If you find a bug in the code, or have a suggestion to be brought up, feel free to open an issue bringing it up and a maintainer will take a look.

**If you wish to work on an issue opened in the repository, leave a comment on the issue so that the issue can be assigned to you. This helps avoid conflicts and duplicate pull requests.** 

*Note: Make sure to test your changes in your local machine before opening a pull request. Also, refrain from modifying the config files in the project. All written code to be modified lies mostly in the `app` directory*

For frontend contributions, please ensure to follow the same theme as the main homepage to ensure consistency.

### Code Style

- Follow the existing code style in the project
- Use TypeScript for all new code
- Run `npm run lint` to ensure code style compliance
- Write meaningful comments for complex logic

### Project Structure

 - Code goes into the `app` directory
  - Inside the directory, URL's follow directory path with the `page.tsx` file specifying the layout the page. For example, the path `/login` would translate into a `login` directory created within the root `app` folder. The login directory would then contain a `page.tsx` describing how the page would look like.

 - Image and other media resources goes into the `public` directory.

