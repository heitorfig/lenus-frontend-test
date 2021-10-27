import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { WeightLog } from '../interfaces/Weight';

const CurrentWeight = ({ weightLog }: { weightLog: WeightLog | null | undefined }) => {
  return (
    <Stack sx={{ mb: 3 }} data-testid="current-weight">
      <Typography variant="subtitle1" component="span">
        Your Current Weight
      </Typography>
      <Typography variant="h1" component="div" sx={{ fontWeight: 700 }} color="primary">
        {weightLog ? weightLog.weight : "0.0"}<small>kg</small>
      </Typography>
    </Stack>
  );
};

export default CurrentWeight;