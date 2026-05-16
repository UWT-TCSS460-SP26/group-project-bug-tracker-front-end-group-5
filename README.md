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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


Individual writeups:

Carson-My first promt was giving the Vscode copilot AI the sprint intructions as an .md file and our openai.yaml file along with the prompt "Using the openapi.yaml do the work for Sprint 5 following the instructions". The agent produced a nice looking bug report submission front end. It had a simple white background, with the four fields(title, descirption, steps to reproduce, email) and a submit button. Each field had a description in it of an example input and it showed which fields were optional. There were a few issues, however. So for my second prompt I told it no reports could be submitted and an error kept getting displayed. The agent fixed the error(the port in the .env file was wrong). It did not change the appearance at all. I then prompted the AI to not put the optional tag next to title and description fields since those are required. It got rid of those and everything else stayed the same. I kept everything except a line of text that said you only needed a title or description since that wasnt true. Everything else looed nice. The last promt I did was to enforce proper formatting for the email address, but that did not chnage the appearance of the front end. Next time I would initially promt it to follow the instructions EXACTLY and not add any extra stuff to it, since then it would more likely follow instructions and I could prompt it to add extra features later.
