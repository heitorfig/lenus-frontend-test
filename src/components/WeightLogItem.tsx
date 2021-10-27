import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { WeightLog } from "../interfaces/Weight";
import { formatDate } from '../utils/date';

const WeightLogItem = ({
  weightLog,
  onEditClick,
  onDeleteClick,
}: {
  weightLog: WeightLog;
  onEditClick?: any;
  onDeleteClick?: any;
}) => {
  return (
    <Card variant="outlined" key={`weightLog_${weightLog.id}`} sx={{ mb: 2 }} data-testid="log-weight-card">
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {formatDate(weightLog.date)}
          </Typography>
          <Typography component="div" variant="h4" sx={{ fontWeight: 500 }}>
            {weightLog.weight}kg
          </Typography>

          <CardActions disableSpacing>
            {onEditClick && (
              <IconButton
                color="primary"
                aria-label="Edit Weight Log"
                onClick={() => onEditClick(weightLog)}
              >
                <EditIcon />
              </IconButton>
            )}
            {onDeleteClick && (
              <IconButton
                color="error"
                aria-label="Delete Weight Log"
                onClick={() => onDeleteClick(weightLog)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </CardActions>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default WeightLogItem;
