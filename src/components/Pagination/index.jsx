import ReactPaginate from "react-paginate";

function Pagination({ pageCount, activePage, setActivePage }) {
  return (
    <div className="mt-10">
      <ReactPaginate
        previousLabel="← Prev"
        nextLabel="Next →"
        pageCount={pageCount}
        initialPage={0}
        forcePage={activePage - 1}
        onPageChange={({ selected }) => setActivePage(selected + 1)}
        containerClassName="flex flex-wrap items-center justify-center gap-4 bg-transparent"
        pageClassName=" px-2 text-lg text-white"
        breakClassName="text-lg text-white"
        previousClassName={`${
          activePage === 1 ? "text-white/40" : "text-white"
        } px-2 text-lg`}
        nextClassName={`${
          activePage === pageCount ? "text-white/40" : "text-white"
        } px-2 text-lg`}
        activeClassName="px-2 text-lg text-red"
      />
    </div>
  );
}

export default Pagination;
