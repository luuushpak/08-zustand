import css from "./Home.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub - Page Not Found",
  description: "This page does not exist",
  openGraph: {
    title: "NoteHub - Page Not Found",
    description: "The page you are looking for does not exist",
    url: "https://08-zustand-iota-ebon.vercel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: "1200",
        height: "630",
        alt: "NoteHub - Page Not Found",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
