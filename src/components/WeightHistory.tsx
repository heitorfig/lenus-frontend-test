import { WeightLog } from '../interfaces/Weight';
import WeightLogItem from "./WeightLogItem";

const WeightHistory = ({
  weightHistory,
  onEditClick,
  onDeleteClick,
}: {
  weightHistory: WeightLog[];
  onEditClick?: any;
  onDeleteClick?: any;
}) => {
  return (
    <div data-testid="weight-history">
      {weightHistory.map((weightLog: WeightLog) => {
        return (
          <WeightLogItem key={weightLog.id} weightLog={weightLog} onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
        );
      })}
    </div>
  );
};

export default WeightHistory;
