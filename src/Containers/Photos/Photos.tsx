import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "../../components/DataTable";
import { ImageGallery } from "../../components/ImageGallery";
import { photoDataSelector, changePaginate, getAllPhotos } from "../../reducers/photosReducer";

export const Photos = () => {
 

  const { page, photos, rowsPerPage, totalNoOfPhotos } =
    useSelector(photoDataSelector);

  const dispatch = useDispatch();

  const onPageChange = ({page, rowsPerPage}: {page: number, rowsPerPage: number}) => {dispatch(changePaginate({page, rowsPerPage}))}

  useEffect(() => {
    dispatch(getAllPhotos({ page, rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);


  return (
    <ImageGallery
      noOfRows={totalNoOfPhotos}
      data={photos}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
    />
  );
};
