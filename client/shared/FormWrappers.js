import TextFieldInput from "@material-ui/core/TextField";

export const TextField = ({
  input: { name, onChange, value, ...restInput },
  meta,
  ...rest
}) => (
  <TextFieldInput
    {...rest}
    name={name}
    helperText={meta.touched ? meta.error : undefined}
    error={meta.error && meta.touched}
    inputProps={restInput}
    onChange={onChange}
    value={value}
  />
);
