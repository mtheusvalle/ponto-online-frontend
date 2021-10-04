import { useEffect, useState, useRef } from "react";

import { CircularProgress, Box, Typography } from "@mui/material";
import { formatTime } from "../helpers";

export default function Progress() {
  const [tempo, setTempo] = useState(10);
  const [pause, setPause] = useState(false);

  

  return (
    <Box sx={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {tempo}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", mr: 1, ml: 1 }}>
        <CircularProgress />
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          05:00
        </Typography>
      </Box>
    </Box>
  );
}
