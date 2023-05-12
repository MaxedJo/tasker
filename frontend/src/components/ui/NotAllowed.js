import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";

export default function NotAllowed() {
    return (
        <Box m="auto">
            <Typography maxWidth="70vh" variant="h3">У вас недостаточно прав для просмотра данной страницы</Typography>
        </Box>
    );
}