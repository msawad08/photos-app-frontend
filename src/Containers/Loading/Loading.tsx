import { CssBaseline, Container, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { appDataSelector, verifyAuth } from "../../reducers/appReducer";

export default function Loading() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn, isLoading  } = useSelector(appDataSelector);

  React.useEffect(()=>{
    if(!navigate && !dispatch) return;
    if(isLoggedIn) navigate("/app");
    else if(!isLoggedIn && isLoading) dispatch(verifyAuth())
    else if(!isLoggedIn && !isLoading) navigate("/login");
  }, [navigate, dispatch, isLoggedIn, isLoading])

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "50vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          
        >
            <CircularProgress />
        </Box>
      </Container>
    )
}
