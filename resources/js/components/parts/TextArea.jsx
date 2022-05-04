import React from "react";
import {Controller} from "react-hook-form";
import {FormGroup, Label, Input} from "reactstrap";

export default function TextArea({control, name, label, errors}) {
  return <Controller
    control={control}
    name={name}
    render={({field: {onChange, value}}) => (
      <FormGroup>
        <Label><h6>{label}</h6></Label>
        <Input
          type="textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </FormGroup>
    )}
  />
}
