import type { Metadata } from "next";

// Internal tool — never index it.
export const metadata: Metadata = {
  title: { absolute: "Lead Manager · Atlas" },
  robots: { index: false, follow: false },
};

export default function ManageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
