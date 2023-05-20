import {useRef, useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {ButtonBase} from "@mui/material";
import './assets/FileInput.css';
import Button from "@mui/material/Button";
import {uploadFile} from "../../api/client";

const FileInput = ({taskId, label, onChange, error, onUpload}) => {
    const ref = useRef();
    const [attachment, setAttachment] = useState(null);

    const handleChange = (event) => {
        const files = Array.from(event.target.files);
        const [file] = files;
        setAttachment(file);
        if (!!onChange) onChange({target: {value: file}});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append("file", attachment);
        uploadFile(data, taskId).then(r => onUpload(r.data));
    }
    return (
        <Box
            component="form"
            className="file-upload-box" display="flex"
            onSubmit={handleSubmit}>
            <Box
                style={{flex: '1 0 25%'}}
                position="relative"
                height={98}
                color={
                    !!error ? 'red' : '#fff'
                }
                borderBottom={4}
            >
                <Box position="absolute" top={0} bottom={0} left={0} right={0} mx={2}>
                    <TextField
                        variant="standard"
                        className="file-input-field"
                        InputProps={{disableUnderline: true}}
                        margin="normal"
                        fullWidth
                        disabled
                        label={label}
                        value={attachment?.name || ""}
                        error={!!error}
                        helperText={error?.message || " "}
                    />
                </Box>
                <ButtonBase
                    className="file-input-button"
                    component="label"
                    onKeyDown={(e) => e.keyCode === 32 && ref.current?.click()}
                >
                    <input
                        id="file"
                        ref={ref}
                        type="file"
                        hidden
                        onChange={handleChange}
                    />
                </ButtonBase>
            </Box>
            <Button variant="outlined" type="submit" disabled={!attachment}>Загрузить</Button>
        </Box>
    );
};

export default FileInput;
