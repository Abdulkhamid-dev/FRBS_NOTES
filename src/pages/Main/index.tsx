import React, { Suspense } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BiMenu } from "react-icons/bi"
import { GrNotes } from "react-icons/gr"
import { HiOutlineUsers } from "react-icons/hi"
import { RxExit } from "react-icons/rx"
import { MdOutlineMoveToInbox, MdOutlineMailOutline } from "react-icons/md"
import Logo from '../../assets/img/logo_1.png'
import { StyledMain, StyledSider } from './Style';
import LoadingCom from '../../component/LoadingComp/LoadingCom';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { MainRouter, ProtectedRoute } from '../../router';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearAccount } from '../../store/account/accountSlice';

const drawerWidth = 240;
const userNavigations = [
    { text: "Todos", path: "/", icon: <GrNotes size={18} /> },
]
const adminNavigations = [
    { text: "Todos", path: "/", icon: <GrNotes size={18} /> },
    { text: "Users", path: "/users", icon: <HiOutlineUsers size={18} /> }
]

interface Props {
    window?: () => Window;
}

export default function Main(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const account = useAppSelector(state => state.account)
    const dispatch = useAppDispatch()

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const logOut = () => {
        dispatch(clearAccount())
        console.log("logs");
    }
    const drawer = (
        <StyledSider>
            <div>
                <Toolbar>
                    <img src={Logo} className="logo" alt="" />
                </Toolbar>
                <Divider />
                <List>

                    {account.role === "admin" ? adminNavigations.map((link, index) => (
                        <NavLink
                            key={index}
                            to={link?.path}
                            className={({ isActive }) =>
                                isActive ? "active" : "dis-active"
                            }
                        >
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {link?.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={link?.text} />
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                    )) : userNavigations.map((link, index) => (
                        <NavLink
                            to={link?.path}
                            className={({ isActive }) =>
                                isActive ? "active" : "dis-active"
                            }
                        >
                            <ListItem key={index} disablePadding>
                                <ListItemButton >
                                    <ListItemIcon>
                                        {link?.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={link?.text} />
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                    ))}
                </List>
            </div>
            <ListItem disablePadding onClick={logOut}>
                <ListItemButton className="exit-content">
                    <ListItemIcon>
                        <RxExit color="red" size={18} fontWeight={600} />
                    </ListItemIcon>
                    <ListItemText primary="Exit" />
                </ListItemButton>
            </ListItem>
        </StyledSider>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <StyledMain>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar sx={{ backgroundColor: "rgb(204 204 204 / 87%)" }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <BiMenu />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Daily routines & reminders
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                    <Suspense fallback={<LoadingCom />}>
                        <Routes>
                            {MainRouter.map((item) => {
                                const { path, element: Component, roles } = item;
                                return <Route key={path} path={path} element={<ProtectedRoute allowedRoles={roles} role={account.role} children={<Component />} />} />;
                            })}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </Suspense>
                </Box>
            </Box>
        </StyledMain>
    );
}