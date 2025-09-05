export default function Pagination({ currentPage, onPageChange }) {
  return (
    <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ⬅️ Anterior
      </button>
      <span>Página {currentPage}</span>
      <button onClick={() => onPageChange(currentPage + 1)}>
        Próxima ➡️
      </button>
    </div>
  );
}