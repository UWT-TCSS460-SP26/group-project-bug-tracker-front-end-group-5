"use client";

import { useRef, useState } from "react";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; issueId: number; createdAt: string }
  | { status: "validation"; errors: string[] }
  | { status: "network" };

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://tcss460-group-5-api.onrender.com";

export default function BugReportPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reproSteps, setReproSteps] = useState("");
  const [reporter, setReporter] = useState("");
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim() && !description.trim()) {
      setState({ status: "validation", errors: ["A title or description is required."] });
      setTimeout(() => errorRef.current?.focus(), 0);
      return;
    }

    setState({ status: "submitting" });

    const body: Record<string, string> = {};
    if (title.trim()) body.title = title.trim();
    if (description.trim()) body.description = description.trim();
    if (reproSteps.trim()) body.reproSteps = reproSteps.trim();
    if (reporter.trim()) body.reporter = reporter.trim();

    try {
      const res = await fetch(`${API_URL}/v1/issues`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        setTitle("");
        setDescription("");
        setReproSteps("");
        setReporter("");
        setState({ status: "success", issueId: data.issueId, createdAt: data.createdAt });
        setTimeout(() => successRef.current?.focus(), 0);
        return;
      }

      const data = await res.json().catch(() => ({}));

      if (res.status === 400) {
        const raw = data.details ?? data.error ?? "Invalid submission.";
        const errors: string[] = Array.isArray(raw) ? raw : [raw];
        setState({ status: "validation", errors });
        setTimeout(() => errorRef.current?.focus(), 0);
        return;
      }

      setState({ status: "network" });
    } catch {
      setState({ status: "network" });
    }
  }

  if (state.status === "success") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <div
          ref={successRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="bg-white rounded-2xl shadow-md max-w-lg w-full p-8 text-center outline-none"
        >
          <div className="flex justify-center mb-4 text-5xl" aria-hidden="true">✅</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted</h1>
          <p className="text-gray-600 mb-1">
            Issue <span className="font-mono font-semibold">#{state.issueId}</span> was filed successfully.
          </p>
          <p className="text-sm text-gray-400 mb-6">
            {new Date(state.createdAt).toLocaleString()}
          </p>
          <button
            onClick={() => setState({ status: "idle" })}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
          >
            Submit another report
          </button>
        </div>
      </main>
    );
  }

  const isSubmitting = state.status === "submitting";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white rounded-2xl shadow-md max-w-lg w-full p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Report a Bug</h1>
        <p className="text-sm text-gray-500 mb-6">
          No account needed. Your report goes directly to the team.
        </p>

        {state.status === "validation" && (
          <div
            ref={errorRef}
            tabIndex={-1}
            role="alert"
            className="mb-5 rounded-lg border border-red-300 bg-red-50 p-4 outline-none"
          >
            <p className="font-semibold text-red-800 mb-1">Please fix the following:</p>
            <ul className="list-disc list-inside text-sm text-red-700 space-y-0.5">
              {state.errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {state.status === "network" && (
          <div
            ref={errorRef}
            tabIndex={-1}
            role="alert"
            className="mb-5 rounded-lg border border-yellow-300 bg-yellow-50 p-4 outline-none"
          >
            <p className="font-semibold text-yellow-800 mb-1">Could not reach the server</p>
            <p className="text-sm text-yellow-700">
              Your report was not submitted. Check your connection and try again — nothing you typed has been lost.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Short summary of the bug"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:bg-gray-100 transition"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What went wrong? What did you expect to happen?"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:bg-gray-100 transition resize-y"
            />
            <p className="mt-1 text-xs text-gray-400">
              Title or description required — both are welcome.
            </p>
          </div>

          <div>
            <label htmlFor="reproSteps" className="block text-sm font-medium text-gray-700 mb-1">
              Reproduction steps{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="reproSteps"
              rows={3}
              value={reproSteps}
              onChange={(e) => setReproSteps(e.target.value)}
              placeholder={"1. Go to /v1/movies\n2. Add ?primary_release_date_gte=2020-01-01\n3. See error"}
              disabled={isSubmitting}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:bg-gray-100 transition resize-y font-mono"
            />
          </div>

          <div>
            <label htmlFor="reporter" className="block text-sm font-medium text-gray-700 mb-1">
              Your name or email{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              id="reporter"
              type="text"
              value={reporter}
              onChange={(e) => setReporter(e.target.value)}
              placeholder="alice@example.com"
              disabled={isSubmitting}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:bg-gray-100 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {isSubmitting ? "Submitting…" : "Submit report"}
          </button>
        </form>
      </div>
    </main>
  );
}
