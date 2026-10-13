import { mockRequests } from "./mock-requests";

export function transitionRequest(
  id,
  { status, activityLabel, tone = "info", note, noteField },
) {
  const request = mockRequests.find((item) => item.id === String(id));

  if (!request) {
    throw new Error(`Request dengan ID ${id} tidak ditemukan.`);
  }

  const previousStatus = request.status;

  request.status = status;

  if (noteField && note) {
    request[noteField] = note;
  }

  const changes = [
    {
      field: "Status",
      from: previousStatus,
      to: status,
    },
  ];

  if (noteField && note) {
    const commentLabel =
      noteField === "approverComment"
        ? "Komentar Approver"
        : "Komentar Reviewer";

    changes.push({
      field: commentLabel,
      value: note,
    });
  }

  if (!Array.isArray(request.activities)) {
    request.activities = [];
  }

  request.activities.push({
    label: activityLabel,
    actor: "Pengguna saat ini",
    time: new Date().toLocaleString("id-ID", {
      dateStyle: "long",
      timeStyle: "short",
    }),
    tone,
    changes,
  });

  return request;
}
