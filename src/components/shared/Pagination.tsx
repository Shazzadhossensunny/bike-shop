import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize: number) => void;
}

export function Pagination({
  current,
  total,
  pageSize,
  onChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, current - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 1) {
      pages.unshift(1);
      if (startPage > 2) {
        pages.splice(1, 0, -1); // -1 represents ellipsis
      }
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(-1);
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === current) return;
    onChange(page, pageSize);
  };

  return (
    <div className="flex items-center justify-between gap-4 mt-4">
      <div className="flex items-center gap-2">
        <button
          className={`p-2 rounded border ${
            current === 1
              ? "bg-gray-100 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
          onClick={() => handlePageChange(current - 1)}
          disabled={current === 1}
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) =>
            page === -1 ? (
              <span key={index} className="px-3 py-1">
                ...
              </span>
            ) : (
              <button
                key={index}
                className={`px-3 py-1 rounded border ${
                  page === current
                    ? "bg-primary text-white border-primary"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          className={`p-2 rounded border ${
            current === totalPages
              ? "bg-gray-100 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
          onClick={() => handlePageChange(current + 1)}
          disabled={current === totalPages}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
