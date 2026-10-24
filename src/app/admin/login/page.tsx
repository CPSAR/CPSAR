import type { Metadata } from "next";
import { AdminLoginForm } from "../components/AdminLoginForm";

export const metadata: Metadata = { title: "Staff sign in | CPSAR" };

export default function AdminLoginPage() {
  return <AdminLoginForm />;
}
