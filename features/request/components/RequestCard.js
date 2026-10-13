import Link from "next/link";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "./StatusBadge";
import { ROUTES } from "@/config/routes";

function getInitials(name) {
  const afterDash = name.includes("-") ? name.split("-")[1] : name;
  return afterDash
    .trim()
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function RequestCard({ item, basePath = ROUTES.request }) {
  return (
    <Link href={`${basePath}/${item.id}`} className="block">
      <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
        <CardContent className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">#{item.ticketNumber}</span>
            <StatusBadge status={item.status} />
          </div>

          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {item.title}
          </h3>

          <p className="text-sm text-gray-500 -mt-1.5">{item.category}</p>

          <div className="flex items-center gap-2 text-sm text-gray-700 mt-1">
            <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shrink-0">
              {getInitials(item.name)}
            </span>
            <span className="truncate">{item.name}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{item.date}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
