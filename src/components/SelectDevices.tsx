import React from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
    value?: string;
    onChange: (value: string) => void;
}

const SelectDevices: React.FC<Props> = ({ value, onChange }) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Devices</InputLabel>
            <Select
                defaultValue={"iPhone"}
                label="Devices"
                onChange={(e) => onChange(e.target.value)}
            >
                <MenuItem value={"iPhone"}>iPhone</MenuItem>
                <MenuItem value={"iPad"}>iPad</MenuItem>
                <MenuItem value={"JBL Party Box 710"}>JBL Party Box 710</MenuItem>
            </Select>
        </FormControl>
    );
};

export default SelectDevices;
