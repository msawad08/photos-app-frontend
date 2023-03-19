import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,

    Typography,
    Toolbar,

  } from "@mui/material";
  


    

  
  export type HeadCell = {
    id: string;
    numeric?: boolean;
    label: string;
  };
  
  type PropTypes = {
    rowsPerPage?: number;
    headCells: HeadCell[];
    data: Record<string, any>[];
    noOfRows: number;
    page: number;
    onPageChange: Function;
  };
  
  export function DataTable(props: PropTypes) {
    const {
      rowsPerPage = 20,
      headCells = [],
      data = [],
      noOfRows = 0,
      page,
      onPageChange,
    } = props;
  
  
    if (data.length === 0) {
      return (
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Typography>Data Not Available</Typography>
        </Paper>
      );
    }
    return (
      <div>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
            }}
          >
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Users
            </Typography>

          </Toolbar>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {headCells.map((headCell: HeadCell) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? "right" : "left"}
                      sx={{fontWeight: "bold"}}
                      padding={"normal"}>
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item: any) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={item.id}
                  >
                    {headCells.map(({ id, numeric }: any) => (
                      <TableCell align={numeric ? "right" : "left"} key={id}>
                        {item[id] || "-"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20, 25]}
            component="div"
            count={noOfRows}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, page) => {onPageChange({page})}}
            onRowsPerPageChange={(event) => {onPageChange({rowsPerPage: event.target.value, page: 0})}}
          />
        </Paper>
      </div>
    );
  }
  