const Pagination = ({ currentPage, totalPages, onPrevious, onNext, onPage }) => {
  if (!totalPages || totalPages < 1) return null;

  const pageNumbers = [];
  const maxButtons = 5;
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, currentPage + half);

  if (currentPage <= half) {
    start = 1;
    end = Math.min(totalPages, maxButtons);
  }

  if (currentPage + half >= totalPages) {
    start = Math.max(1, totalPages - maxButtons + 1);
    end = totalPages;
  }

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-wrapper">
      <button
        className="page-button"
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      <div className="page-numbers">
        {start > 1 && (
          <button className="page-number" onClick={() => onPage(1)}>
            1
          </button>
        )}
        {start > 2 && <span className="page-ellipsis">...</span>}

        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`page-number ${page === currentPage ? "active" : ""}`}
            onClick={() => onPage(page)}
          >
            {page}
          </button>
        ))}

        {end < totalPages - 1 && <span className="page-ellipsis">...</span>}
        {end < totalPages && (
          <button className="page-number" onClick={() => onPage(totalPages)}>
            {totalPages}
          </button>
        )}
      </div>

      <button
        className="page-button"
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </nav>
  );
};
export default Pagination;
