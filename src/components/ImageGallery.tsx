import {
    Box,
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
              All Users
            </Typography>

          </Toolbar>
          <ImageList sx={{ width: 500, height: 450 }}>

      {data.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}`}
            srcSet={`${item.img}`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
          />
        </ImageListItem>
      ))}
    </ImageList>
          <TablePagination
            rowsPerPageOptions={[9, 16, ]}
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
  