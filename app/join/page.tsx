import type { Metadata } from "next";
import { JoinRequest } from "@/components/site/JoinRequest";

export const metadata: Metadata = {
  title: "Join Quantix",
  description: "Send a request to join the Quantix quantum computing community."
};

export default function JoinPage() {
  return <JoinRequest />;
}
