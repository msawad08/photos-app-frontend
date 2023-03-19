import {
  Paper,
  TablePagination,
  Typography,
  Toolbar,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

type PropTypes = {
  rowsPerPage?: number;
  data: Record<string, any>[];
  noOfRows: number;
  page: number;
  onPageChange: Function;
};

const RowsPerPageOption = new Map([[8,4], [10,5], [15,5], [18,6]])

export function ImageGallery(props: PropTypes) {
  const {
    rowsPerPage = 9,
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
            Photos
          </Typography>
        </Toolbar>
        <ImageList cols={RowsPerPageOption.get(rowsPerPage)}>
          {data.map((item) => (
            <ImageListItem key={item.name}>
              <img
                src={`${item.path}`}
                srcSet={`${item.path}`}
                alt={item.name}
                loading="lazy"
              />
              <ImageListItemBar title={item.name} />
            </ImageListItem>
          ))}
        </ImageList>
        <TablePagination
          rowsPerPageOptions={Array.from(RowsPerPageOption.keys())}
          component="div"
          count={noOfRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, page) => {
            onPageChange({ page });
          }}
          onRowsPerPageChange={(event) => {
            onPageChange({ rowsPerPage: event.target.value, page: 0 });
          }}
        />
      </Paper>
    </div>
  );
}
