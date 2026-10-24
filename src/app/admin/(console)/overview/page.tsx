import type { Metadata } from "next";
import { AdminDashboard } from "../../components/AdminDashboard";

export const metadata: Metadata = { title: "Overview | CPSAR Admin" };
export default function Page() { return <AdminDashboard />; }
