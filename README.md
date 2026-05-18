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

Carson-My first promt was giving the Vscode copilot AI the sprint intructions as an .md file and our openai.yaml file along with the prompt "Using the openapi.yaml do the work for Sprint 5 following the instructions". The agent produced a nice looking bug report submission front end. It had a simple white background, with the four fields(title, descirption, steps to reproduce, email) and a submit button. Each field had a description in it of an example input and it showed which fields were optional. There were a few issues, however. So for my second prompt I told it no reports could be submitted and an error kept getting displayed. The agent fixed the error(the port in the .env file was wrong). It did not change the appearance at all. I then prompted the AI to not put the optional tag next to title and description fields since those are required. It got rid of those and everything else stayed the same. I kept everything except a line of text that said you only needed a title or description since that wasnt true. Everything else looked nice. The last promt I did was to enforce proper formatting for the email address, but that did not chnage the appearance of the front end. Next time I would initially promt it to follow the instructions EXACTLY and not add any extra stuff to it, since then it would more likely follow instructions and I could prompt it to add extra features later.

Geovnai
### Initial Prompt

Read the sprint-5 pdf and to make a bugtracker using the openapi file

### First Output
The agent read the spec, extracted the POST /v1/issues request shape, and scaffolded everything in one pass. It produced every file the project needed including page.tsx, BugReportForm.tsx, globals.css, next.config.ts, tsconfig.json, package.json, postcss.config.mjs, eslint.config.mjs, and a WORKFLOWS.md template. The form handles success, validation errors, and network failure

### What I kept
Everything the agent produced.

### What I'd do next
I would start with smaller things then work my way up


Evin
### Initial Prompt

Read the sprint-5 pdf and complete the bugtracker front end referencing the openapi.yaml file.

### First Output

The agent produced:
🎯 Completed Deliverables
✅ Core Application Files
Next.js App Router structure with TypeScript support
BugReportForm.tsx - Complete form component with:
Full form validation matching OpenAPI spec
Three-state error handling (validation, server, network errors)
Success confirmation with issue ID
Accessible design with proper labels, ARIA attributes, error associations
Mobile-responsive styling

✅ Configuration Files
package.json - All dependencies configured
next.config.js - Next.js configuration
tsconfig.json - TypeScript setup
.env.local - Development API URL (localhost:3000)
.env.production - Production API URL template
.eslintrc.json - Linting rules

✅ Documentation
README.md - Comprehensive guide covering features, setup, deployment, troubleshooting
QUICKSTART.md - Fast-track guide for getting started
DEPLOYMENT.md - Step-by-step deployment to Vercel or Render with CORS setup
WORKFLOWS.md - Template for team members to document their individual AI scaffolding workflows
API_EXAMPLES.md - Example requests/responses for testing the form

📋 Form Features
The form:

✅ Posts to POST /v1/issues without authentication
✅ Validates that at least title OR description is required (per OpenAPI spec)
✅ Accepts optional fields: reproSteps, reporter
✅ Shows success message with issue ID on submission
✅ Displays validation errors from API inline with fields
✅ Handles network failures gracefully
✅ Fully accessible (WCAG compliant)
✅ Works on desktop and mobile

**What worked well:**
- Everything just works, there was no need for iteration

**What missed the mark:**
- Nothing

---

## Team Meeting Minutes — Scaffold Comparison & Final Build Decision

### Members Present
- Carson
- Geovnai
- Evin
- Kylen

### Each Member's Build Summary

**Carson:** Produced a clean, minimal bug report form with a white background, four fields (title, description, steps to reproduce, email), and a submit button. Required multiple follow-up prompts to fix a misconfigured port in `.env`, remove incorrect "optional" labels from required fields, and add email format validation. Final result was functional after iteration.

**Geovnai:** Agent scaffolded the full project in a single pass from the sprint PDF and OpenAPI spec, producing all necessary files including `page.tsx`, `BugReportForm.tsx`, `globals.css`, and config files. Form handled success, validation errors, and network failures. Everything produced was kept as-is.

**Evin:** Agent produced a comprehensive deliverable including the form component, config files, environment files, and extensive documentation (README, QUICKSTART, DEPLOYMENT, WORKFLOWS, API_EXAMPLES). Form was fully accessible, mobile-responsive, and matched the OpenAPI spec. No iteration was needed.

**Kylen:** Produced a polished, production-quality UI with strong visual design, intuitive layout, and clean user experience. Required no changes or follow-up prompts, and introduced no front-end bugs during testing.

### Comparison

| Member  | UI Quality | Bugs Found | Changes Required |
|---------|-----------|------------|-----------------|
| Carson  | Good      | Yes (port config, label issues) | Yes |
| Geovnai | Good      | None       | None            |
| Evin    | Good      | None       | None            |
| Kylen   | Best      | None       | None            |

### Decision

All four front-end UIs functioned correctly. After review, the team selected **Kylen's build** as the final submission.

All test front-end UIs worked, but we selected Kylen's because it had the best UI design and ease of use. Additionally, Kylen's was the only one we didn't need to change anything about or that produced any front-end bugs. Hence, for those reasons we picked Kylen's bug tracker front-end.
