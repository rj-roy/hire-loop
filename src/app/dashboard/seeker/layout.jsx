import { requireRole } from "@/lib/core/session";

export default async function SeekerLayout({ children }) {
  await requireRole('seeker');
  return children;
}