import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { Controller } from "react-hook-form";

import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";

const CustomDatePicker = ({
  name,
  label,
  control,
  rules,
  disableFuture,
  defaultValue,
  ...props
}: {
  name: string;
  control: any;
  rules: any;
  label: string;
  disableFuture?: boolean;
  defaultValue?: string | Date;
}) => {
  const maxDate = disableFuture ? new Date() : undefined;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        shouldUnregister={true}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            maxDate={maxDate}
            disableFuture={disableFuture}
            onChange={onChange}
            value={value}
            label={label}
            renderInput={(params: any) => <TextField {...params} {...props} />}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
