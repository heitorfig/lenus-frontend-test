import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { WeightLog } from "../interfaces/Weight";
import weightHistoryService from "../services/weightHistoryService";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";

import CustomDatePicker from "./CustomDatePicker";
import CurrentWeight from "./CurrentWeight";
import WeightHistory from "./WeightHistory";

import { formatDate } from "../utils/date";

const WeightTracker = () => {
  const userId = "#1";

  const [weightLogDialogIsOpen, setWeightDialogIsOpen] =
    useState<boolean>(false);
  const [selectedWeightLog, setSelectedWeightLog] =
    useState<WeightLog | null>();

  const [currentWeight, setCurrentWeight] = useState<WeightLog | null>();
  const [weightHistory, setWeightHistory] = useState<WeightLog[]>([]);

  const {
    register,
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { isValid },
    watch
  } = useForm({
    mode: "onChange"
  });

  useEffect(() => {
    loadWeightLogs();
  }, []);

  const onSubmit = (data: WeightLog) => {
    data.userId = userId;

    let action;
    if (selectedWeightLog && selectedWeightLog.id) {
      action = weightHistoryService.update(selectedWeightLog.id, data);
    } else {
      action = weightHistoryService.add(data);
    }

    action.then(() => {
      loadWeightLogs();
    });

    closeDialog();
  };

  const loadWeightLogs = () => {
    weightHistoryService.getAll({ userId }).then((data) => {
      setWeightHistory(data);
      setCurrentWeight(data[0]);
    });
  };

  const handleAddWeightLogClick = () => {
    setWeightDialogIsOpen(true);
    setSelectedWeightLog(null);

    reset();
  };

  const handleEditWeightLogClick = (weightLog: WeightLog) => {
    setWeightDialogIsOpen(true);
    setSelectedWeightLog(weightLog);

    setValue("weight", weightLog.weight);
    setValue("date", weightLog.date);
  };

  const handleDeleteWeightLogClick = (weightLog: WeightLog) => {
    weightHistoryService.delete(weightLog).then(() => {
      loadWeightLogs();
    });
  };

  const closeDialog = () => {
    setWeightDialogIsOpen(false);
    setSelectedWeightLog(null);

    reset();
  };

  const handleCloseDialog = () => {
    closeDialog();
  };

  const isDialogFormValid = () => {
    const maxDate = new Date();
    const date = new Date(watch("date"));
    return isValid && date <= maxDate;
  };

  return (
    <>
      <Box component="main" sx={{ mt: 2, mb: 2 }}>
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <CurrentWeight weightLog={currentWeight} />

          <Button
            variant="contained"
            disableElevation
            size="large"
            sx={{ mb: 2 }}
            onClick={handleAddWeightLogClick}
            data-testid="log-weight-button"
          >
            <AddIcon />{" "}
            {weightHistory.length > 0
              ? "Log a Weight Change"
              : "Log Your Weight"}
          </Button>

          <WeightHistory
            weightHistory={weightHistory}
            onEditClick={handleEditWeightLogClick}
            onDeleteClick={handleDeleteWeightLogClick}
          />
        </Container>
      </Box>

      <Dialog
        open={weightLogDialogIsOpen}
        onClose={handleCloseDialog}
        data-testid="log-weight-dialog"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle data-testid="log-weight-dialog-title">
            {selectedWeightLog
              ? `Update Weight Log from ${formatDate(selectedWeightLog.date)}`
              : "Logging Weight Change"}
          </DialogTitle>
          <DialogContent>
            <Stack sx={{ mt: 2 }} direction="row" spacing={2}>
              <CustomDatePicker
                name="date"
                label="Date of Measurement"
                control={control}
                rules={{ required: true }}
                disableFuture
                defaultValue={new Date()}
                data-testid="log-weight-dialog-date-input"
              />
              <TextField
                type="number"
                label="Weight (kg)"
                {...register("weight", { required: true, min: 0.01 })}
                inputProps={{ step: "0.01" }}
                data-testid="log-weight-dialog-weight-input"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              color="error"
              onClick={handleCloseDialog}
              data-testid="log-weight-dialog-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              data-testid="log-weight-dialog-submit"
              disabled={!isDialogFormValid()}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default WeightTracker;
