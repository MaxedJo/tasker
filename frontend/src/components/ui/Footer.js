import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Copyright from "./Copyright";
import {List, ListItemButton, ListItemIcon, ListItemText, Stack} from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="sm">
                <List dense={true} component={Stack} direction="row">
                    <ListItemButton
                        style={{paddingTop: ".75em"}}
                        id="facebook"
                        href="https://ru-ru.facebook.com/"
                    >
                        <ListItemIcon>
                            <FacebookIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Facebook"/>
                    </ListItemButton>
                    <ListItemButton
                        style={{paddingTop: ".75em"}}
                        id="github"
                        href="https://github.com/MaxedJo"
                    >
                        <ListItemIcon>
                            <GitHubIcon/>
                        </ListItemIcon>
                        <ListItemText primary="GitHub"/>
                    </ListItemButton>
                    <ListItemButton
                        style={{paddingTop: ".75em"}}
                        id="mail"
                        href="mailto:vvmax01@mail.ru"
                    >
                        <ListItemIcon>
                            <AlternateEmailIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Mail"/>
                    </ListItemButton>
                </List>
                <Copyright/>
            </Container>
        </Box>
    );
}