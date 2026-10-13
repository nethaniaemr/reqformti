import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "./StatusBadge";
import { ROUTES } from "@/config/routes";

function getInitials(name = "") {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function RequestRow({ item, basePath = ROUTES.request }) {
  return (
    <Link href={`${basePath}/${item.id}`} className="block">
      <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
        <CardContent>
          {/* Mobile */}
          <div className="flex flex-col gap-2.5 md:hidden">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {item.title}
            </h3>

            <div className="flex items-center gap-3 min-w-0">
              <span className="text-sm text-gray-800 shrink-0">
                {item.category}
              </span>

              <span className="flex items-center gap-2 text-sm text-gray-500 min-w-0">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shrink-0">
                  {getInitials(item.name)}
                </span>

                <span className="truncate">
                  {item.badge} - {item.name}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500 whitespace-nowrap">
                {item.date}
              </span>

              <StatusBadge status={item.status} />
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex flex-col gap-2">
            <h3 className="font-semibold text-gray-900 truncate">
              {item.title}
            </h3>

            <div className="flex items-center gap-x-3 text-sm">
              <span className="text-gray-800 shrink-0">
                {item.category}
              </span>

              <span className="flex items-center gap-2 text-gray-500 min-w-0">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shrink-0">
                  {getInitials(item.name)}
                </span>

                <span className="truncate">
                  {item.badge} - {item.name}
                </span>
              </span>

              <div className="flex items-center text-sm">
                <span className="text-gray-500">{item.date}</span>

                <span className="ml-2">
                  <StatusBadge status={item.status} />
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}