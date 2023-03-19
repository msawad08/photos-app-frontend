import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import DashboardDrawer from "../../components/DashboardDrawer";
import { appDataSelector, closeError } from "../../reducers/appReducer";


export default function Dashboard() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isLoggedIn, error } = useSelector(appDataSelector);

  useEffect(()=>{
    if(navigate && !isLoggedIn) navigate("/")
  }, [navigate, isLoggedIn])

  const onCloseError = () =>{
    dispatch(closeError({}))
  }

  const onSelect = (path:string)=>{
    navigate(`/app/${path}`)
  }

  return (
    <Routes>
       <Route index element={<Navigate to="user" replace />} />

        <Route
          path={`user`}
          element={<DashboardDrawer error={error} onCloseError={onCloseError} path="user" onClick={onSelect} />}
      
        />
        <Route
          path={`photo`}
          element={<DashboardDrawer error={error} onCloseError={onCloseError} path="photo" onClick={onSelect}  />}
      
        />
        

    </Routes>
  )
  
}