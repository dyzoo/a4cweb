"use client";

import {
  BookOpen,
  Building2,
  Calendar,
  Clock,
  Compass,
  Droplets,
  Eye,
  Globe2,
  GraduationCap,
  Heart,
  HeartPulse,
  HelpCircle,
  Home,
  Laptop,
  Mail,
  MapPin,
  Monitor,
  Phone,
  ShieldCheck,
  Target,
  Users,
  Utensils,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Building2,
  Calendar,
  Clock,
  Compass,
  Droplets,
  Eye,
  Globe2,
  GraduationCap,
  Heart,
  HeartPulse,
  Home,
  Laptop,
  Mail,
  MapPin,
  Monitor,
  Phone,
  ShieldCheck,
  Target,
  Users,
  Utensils,
};

export default function Icon({
  name,
  ...props
}: { name?: string } & LucideProps) {
  const Component = (name && iconMap[name]) || HelpCircle;
  return <Component {...props} />;
}
