import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import * as React from "react";

export default function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://185.225.34.140:3000/">
                Tasker
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}