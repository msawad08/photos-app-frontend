import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import DashboardDrawer from "../../components/DashboardDrawer";
import { appDataSelector } from "../../reducers/appReducer";


export default function Dashboard() {

  const navigate = useNavigate();

  const { isLoggedIn } = useSelector(appDataSelector);

  useEffect(()=>{
    if(navigate && !isLoggedIn) navigate("/")
  }, [navigate, isLoggedIn])

  return (<DashboardDrawer/>)
  
}