import DetailField from "./DetailField";
import { DEFAULT_REVIEWER, DEFAULT_APPROVER } from "../constants";

function getInitials(name) {
  return name
    .trim()
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function PersonRow({ person }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shrink-0">
        {getInitials(person.name)}
      </span>
      <span className="text-sm">
        <span className="font-medium text-gray-900">{person.name}</span>{" "}
        <span className="font-normal text-gray-500">({person.badge})</span>
      </span>
    </div>
  );
}

export default function AssessmentCard({ item }) {
  const reviewerComment = item.reviewerComment || "ok";
  const approverComment = item.approverComment || "-";

  return (
    <div className="p-5 sm:p-6 space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">Assessment</h3>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-400 block">
          Reviewer
        </label>
        <PersonRow person={DEFAULT_REVIEWER} />
      </div>

      <DetailField label="Komentar Reviewer" value={reviewerComment} />

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-400 block">
          Approver
        </label>
        <PersonRow person={DEFAULT_APPROVER} />
      </div>

      <DetailField label="Komentar Approver" value={approverComment} />
    </div>
  );
}