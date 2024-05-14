import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import PendingIcon from '@mui/icons-material/Pending';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AdJobPending from '~/pages/Admin/AdJobPending';
import AdJobApproved from '~/pages/Admin/AdJobApproved';
import AdJobRefuse from '~/pages/Admin/AdJobRefuse';
import AdPackage from '~/pages/Admin/AdPackage';
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '~/context/AppProvider';
import AdminLayout from '~/layout/adminLayout';
import { AccountCircleOutlined, KeyOutlined } from '@mui/icons-material';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import ChangePasswordAdmin from '~/pages/Admin/changePassword';
import Info from './info';
import SettingsIcon from '@mui/icons-material/Settings';
import ChangSetting from '~/pages/Admin/changeSetting';
import Statisfical from '~/pages/Admin/statisfical/Statisfical';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Sidebar() {
    const { admin } = useContext(AppContext);
    const location = useLocation();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [isHover, setIsHover] = useState(false);
    const { setUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const iconStyle = {
        color: 'rgba(0, 0, 0, 0.54)',
    };
    const boxStyle = {
        height: 50,
        backgroundColor: isHover ? 'rgba(0, 0, 0, 0.04)' : '#fff',
    };
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        setUser(undefined);
        navigate('/admin/login');
    };
    const render = () => {
        if (location.pathname.includes('/admin/manage/0')) {
            return <AdJobPending />;
        } else if (location.pathname.includes('/admin/manage/1')) {
            return <AdJobApproved />;
        } else if (location.pathname.includes('/admin/manage/2')) {
            return <AdJobRefuse />;
        } else if (location.pathname.includes('/admin/manage/3')) {
            return <AdPackage />;
        } else if (location.pathname.includes('/admin/changePassword')) {
            return <ChangePasswordAdmin />;
        } else if (location.pathname.includes('/admin/info')) {
            return <Info />;
        } else if (location.pathname.includes('/admin/changeSetting')) {
            return <ChangSetting />;
        } else if (location.pathname.includes('/admin/statistical')) {
            return <Statisfical />;
        }
    };
    return (
        <AdminLayout>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            {admin?.name}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List style={iconStyle}>
                        {['Việc làm chờ duyệt', 'Việc là đã duyệt', 'Việc làm bị từ chối', 'Gói dịch vụ'].map(
                            (text, index) => (
                                <ListItem key={text} disablePadding>
                                    <ListItemButton component={Link} to={`/admin/manage/${index}`}>
                                        {index === 0 ? (
                                            <PendingIcon style={{ marginRight: 20 }} />
                                        ) : index === 1 ? (
                                            <CheckBoxIcon style={{ marginRight: 20 }} />
                                        ) : index === 2 ? (
                                            <DoDisturbOnIcon style={{ marginRight: 20 }} />
                                        ) : (
                                            <InventoryIcon style={{ marginRight: 20 }} />
                                        )}
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ),
                        )}
                    </List>
                    <Divider />

                    <Link className="text-gray-500 px-4 py-2 hover:bg-gray-100" to={'/admin/info'}>
                        <AccountCircleOutlined style={{ marginRight: 20 }} />
                        Thông tin cá nhân
                    </Link>

                    <Link className="text-gray-500 px-4 py-2 hover:bg-gray-100" to={'/admin/changePassword'}>
                        <KeyOutlined style={{ marginRight: 20 }} />
                        Đổi mật khẩu
                    </Link>

                    <Link className="text-gray-500 px-4 py-2 hover:bg-gray-100" to={'/admin/statistical'}>
                        <StackedLineChartIcon style={{ marginRight: 20 }} />
                        Thống kê
                    </Link>

                    <Link className="text-gray-500 px-4 py-2 hover:bg-gray-100" to={'/admin/changeSetting'}>
                        <SettingsIcon style={{ marginRight: 20 }} />
                        Cài đặt
                    </Link>
                    <Divider />
                    <button
                        style={boxStyle}
                        onClick={handleLogout}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        Đăng xuất
                    </button>
                </Drawer>
                <Main open={open}>
                    <DrawerHeader />
                    {render()}
                </Main>
            </Box>
        </AdminLayout>
    );
}
