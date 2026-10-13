"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb as BreadcrumbUI,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Breadcrumb({ detailLabel }) {
  const pathname = usePathname();

  const items = [];

  if (pathname.startsWith("/form-request")) {
    items.push({
      label: "Form Request",
      href: "/form-request",
    });

    if (pathname === "/form-request/create") {
      items.push({
        label: "Create Request",
      });
    } else if (pathname !== "/form-request") {
      items.push({
        label: detailLabel || "Detail Request",
      });
    }
  } else if (pathname.startsWith("/form-review")) {
    items.push({
      label: "Form Review",
      href: "/form-review",
    });

    if (pathname !== "/form-review") {
      items.push({
        label: detailLabel || "Detail Review",
      });
    }
  } else if (pathname.startsWith("/form-approve")) {
    items.push({
      label: "Form Approve",
      href: "/form-approve",
    });

    if (pathname !== "/form-approve") {
      items.push({
        label: detailLabel || "Detail Approval",
      });
    }
  }

  return (
    <BreadcrumbUI>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
        </BreadcrumbItem>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <span key={idx} className="contents">
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {isLast || !item.href ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbUI>
  );
}
