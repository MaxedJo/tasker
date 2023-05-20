import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import AuthService from "../../auth/AuthService";

const settings = [
    {
        key: 'profile',
        title: 'Профиль'
    },
    {
        key: 'logout',
        title: 'Выход'
    }
];


function ProfileMenu() {
    let navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = (key) => {
        switch (key) {
            case 'profile' :
                navigate("/profile");
                break;
            case 'logout' :
                AuthService.logout();
                navigate("/login");
                break;
        }
        setAnchorElUser(null);
    };
    return (
        <>
            {localStorage.getItem("user")
                ? <Box sx={{flexGrow: 0}}>
                    <Tooltip title="Настройки">
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                            <Avatar alt="Remy Sharp"/>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{mt: '45px'}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting.key} href={setting.url}
                                      onClick={() => handleCloseUserMenu(setting.key)}>
                                <Typography textAlign="center">{setting.title}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
                : <Button color="inherit" href="/login">Вход</Button>}
        </>
    );
}

export default ProfileMenu;