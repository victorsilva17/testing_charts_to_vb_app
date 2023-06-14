"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {}, []);

  return (
    <main>
      <Typography variant="h1" fontSize={2}>
        Home Page
      </Typography>
      <Box
        id="chart"
        sx={{
          width: "100%",
          height: "100%",
          maxWidth: 1000,
          minHeight: 800,
        }}
      ></Box>
    </main>
  );
}
