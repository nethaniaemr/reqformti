import StatusBadge from "./StatusBadge";
import Image from "next/image";

function getInitials(name) {
  const afterDash = name.includes("-") ? name.split("-")[1] : name;
  return afterDash
    .trim()
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");
}

function InfoItem({ label, children }) {
  return (
    <div>
      <span className="text-gray-400 text-sm font-medium block mb-1">
        {label}
      </span>
      {children}
    </div>
  );
}

export default function TicketInfoCard({ item }) {
  return (
    <div className="p-5 sm:p-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        Informasi Order
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5 text-sm">
        <InfoItem label="Nomor Tiket">
          <span className="font-base text-gray-800">#{item.ticketNumber}</span>
        </InfoItem>

        <InfoItem label="Pemohon">
          <div className="flex items-center gap-2 mt-1">
            {item.profilePic ? (
              <Image
                src={item.profilePic}
                alt={item.name}
                width={28}
                height={28}
                className="w-7 h-7 rounded-full object-cover shrink-0"
              />
            ) : (
              <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shrink-0">
                {getInitials(item.name)}
              </span>
            )}

            <span className="font-medium text-gray-900">
              {item.name}
              <span className="text-gray-400 ml-1 font-normal">
                ({item.badge})
              </span>
            </span>
          </div>
        </InfoItem>

        <InfoItem label="Status">
          <StatusBadge status={item.status} />
        </InfoItem>

        <InfoItem label="Tanggal Inisiasi">
          <span className="font-base text-gray-800">{item.date}</span>
        </InfoItem>

        <InfoItem label="Unit Kerja / Departemen">
          <span className="font-base text-gray-800">{item.dept}</span>
        </InfoItem>
      </div>
    </div>
  );
}
