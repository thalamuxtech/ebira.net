import {
  ArrowLeftRight,
  BookOpen,
  Database,
  Globe2,
  GraduationCap,
  Landmark,
  Mic,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  ArrowLeftRight,
  BookOpen,
  Database,
  Globe2,
  GraduationCap,
  Landmark,
  Mic,
  Sparkles,
  Users,
};

export function PillarIcon({
  name,
  size = 22,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Sparkles;
  return <Icon size={size} strokeWidth={1.75} className={className} aria-hidden="true" />;
}
