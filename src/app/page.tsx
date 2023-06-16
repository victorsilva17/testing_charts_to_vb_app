"use client";

import BubbleChart from "@/components/bubbleChart";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {}, []);

  return (
    <main>
      <Typography variant="h1" fontSize={16}>
        Bubble chart
      </Typography>

      <BubbleChart />
    </main>
  );
}
