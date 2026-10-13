export default function PageHeader({ title, description, breadcrumb, action }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
            {title}
          </h2>

          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>

        {action && <div className="w-full md:w-auto shrink-0">{action}</div>}
      </div>

      {breadcrumb && <div>{breadcrumb}</div>}
    </div>
  );
}
