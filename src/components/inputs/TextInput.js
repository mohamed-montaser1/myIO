import React from "react";
import { FormControl, TextField } from "@mui/material";
import { useIntl } from "react-intl";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}));

export default function TextInput({
  name,
  label,
  onChange,
  variant = "filled",
  ...props
}) {
  const classes = useStyles();
  const { formatMessage } = useIntl();

  return (
    <FormControl fullWidth className={classes.root}>
      <TextField
        variant={variant}
        fullWidth
        name={name}
        label={formatMessage({ id: label, defaultMessage: label })}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      ></TextField>
    </FormControl>
  );
}
