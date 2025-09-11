import FeatureCard from "./FeatureCard";
import {
  ChartLine,
  ShieldAlert,
  Wallet,
  Bell,
  Cloud,
} from "lucide-react";

const features = [
  {
    title: "Track Expenses",
    content: "Easily record and manage your daily spending.",
    icon: Wallet,
    iconBg: "blue",
  },
  {
    title: "Monthly Reports",
    content: "Visualize your finances with clear charts.",
    icon: ChartLine,
    iconBg: "green",
  },
  {
    title: "Secure Data",
    content: "Your information is encrypted and safe.",
    icon: ShieldAlert,
    iconBg: "red",
  },
  {
    title: "Smart Notifications",
    content: "Get alerts when you’re close to exceeding your budget.",
    icon: Bell,
    iconBg: "yellow",
  },
  {
    title: "Cloud Sync",
    content: "Keep your data synced across all devices.",
    icon: Cloud,
    iconBg: "indigo",
  },
];

export default function Features() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 px-12">
      {features.map((feat, index) => (
        <FeatureCard
          key={index}
          title={feat.title}
          content={feat.content}
          icon={feat.icon}
          iconBg={feat.iconBg}
        />
      ))}
    </div>
  );
}
