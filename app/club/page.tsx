import type { Metadata } from "next";
import { ClubEntry } from "@/components/site/ClubEntry";

export const metadata: Metadata = {
  title: "Enter the Quantix Club",
  description: "Meet Quantix, discover what the club is about, and choose your way in."
};

export default function ClubPage() {
  return <ClubEntry />;
}
