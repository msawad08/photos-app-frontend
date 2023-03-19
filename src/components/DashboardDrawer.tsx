import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Person as PersonIcon, Photo as PhotoIcon } from "@mui/icons-material";
import { User } from "../Containers/User/User";
import { Photos } from "../Containers/Photos/Photos";
import { Alert, Snackbar } from "@mui/material";

const drawerWidth = 240;

type PropTypes = {
  error: string,
  onCloseError: any
  path: string,
  onClick: any,
}

export default function DashboardDrawer(props: PropTypes) {


  const menuList = [
    {
      label: "User",
      icon: PersonIcon,
      path: "user"
    },
    {
      label: "Photos",
      icon: PhotoIcon,
      path : "photo"
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Photos App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {menuList.map(({ label, icon: Icon, path }) => (
              <ListItem key={label} disablePadding onClick={()=>props.onClick(path)}>
                <ListItemButton selected={path === props.path} >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
          {props.path === "photo"? (<Photos></Photos>):(<User></User>)}
          
      </Box>
      <Snackbar open={props.error.length > 0} anchorOrigin={{vertical:"top", horizontal:"right"}}  onClose={()=>props.onCloseError()}>
            <Alert onClose={()=>props.onCloseError()} severity="error" sx={{width: '100%'}}>
                {props.error}
            </Alert>
        </Snackbar>
    </Box>
  );
}
