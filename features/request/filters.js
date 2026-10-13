export const EMPTY_FILTERS = {
  search: "",
  dateFrom: "",
  dateTo: "",
  status: "",
  jenis: "",
};

export function hasActiveFilters(f) {
  return Boolean(
    f.search ||
      f.dateFrom ||
      f.dateTo ||
      f.status ||
      f.jenis
  );
}

export function applyFilters(items, f) {
  const q = f.search.trim().toLowerCase();

  return items.filter((item) => {
    // Search
    if (
      q &&
      !`${item.title} ${item.id} ${item.name}`
        .toLowerCase()
        .includes(q)
    ) {
      return false;
    }

    // Tanggal Inisiasi
    if (f.dateFrom && item.date < f.dateFrom) {
      return false;
    }

    if (f.dateTo && item.date > f.dateTo) {
      return false;
    }

    // Status
    if (f.status && item.status !== f.status) {
      return false;
    }

    // Jenis Pengembangan
    if (f.jenis && item.category !== f.jenis) {
      return false;
    }

    return true;
  });
}

export const EMPTY_EXPORT_FILTERS = {
  status: "",
  jenis: "",
  dateFrom: "",
  dateTo: "",
};

export function hasActiveExportFilters(f) {
  return Boolean(
    f.status ||
      f.jenis ||
      f.dateFrom ||
      f.dateTo
  );
}

export function applyExportFilters(items, f) {
  return items.filter((item) => {
    if (f.status && item.status !== f.status) {
      return false;
    }

    if (f.jenis && item.category !== f.jenis) {
      return false;
    }

    if (f.dateFrom && item.date < f.dateFrom) {
      return false;
    }

    if (f.dateTo && item.date > f.dateTo) {
      return false;
    }

    return true;
  });
}