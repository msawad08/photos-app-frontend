import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "../../components/DataTable";
import { changePaginate, getAllUsers, userDataSelector } from "../../reducers/userReducer";

export const User = () => {
  const headCells = [
    {
      id: "id",
      numeric: true,
      label: "ID",
    },
    {
      id: "name",
      label: "Name",
    },
    {
      id: "username",
      label: "Username",
    },
    {
      id: "street",
      label: "Street",
    },
    {
      id: "suite",
      label: "Suite",
    },
    {
      id: "city",
      label: "City",
    },
    {
      id: "zip",
      label: "Zip",
    },
    {
      id: "phone",
      label: "Phone",
    },
    {
      id: "website",
      label: "Website",
    },
    {
      id: "company",
      label: "Company",
    },

  ];

  const { page, users, rowsPerPage, totalNoOfUsers } =
    useSelector(userDataSelector);

  const dispatch = useDispatch();

  const onPageChange = ({page, rowsPerPage}: {page: number, rowsPerPage: number}) => {dispatch(changePaginate({page, rowsPerPage}))}

  useEffect(() => {
    dispatch(getAllUsers({ page, rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);


  return (
    <DataTable
      headCells={headCells}
      noOfRows={totalNoOfUsers}
      data={users}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
    />
  );
};
