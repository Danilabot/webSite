import { useGetPagesArray } from '../../components/utils/pages'

export const Pagination = ({ totalPages, page, changePage }) => {
  let pagesArray = useGetPagesArray(totalPages)

  return (
    <div className="page__wrapper">
      {pagesArray.map((p) => (
        <span
          onClick={() => changePage(p)}
          key={p}
          className={page === p ? 'page page__current' : 'page'}
        >
          {' '}
          {p}
        </span>
      ))}
    </div>
  )
}
