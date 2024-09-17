"use client";

import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function ProfileForm() {
  return (
    <>
      <TextField type="tel" label="Phone number" />
      <Button variant="contained" type="submit">Submit</Button>
    </>
  );
}
