import { WeightLog } from "../interfaces/Weight";

class WeightHistoryService {
  private storageKey: string = "weightHistory";
  private weightHistory: WeightLog[] = [];

  constructor() {
    this.weightHistory = JSON.parse(localStorage.getItem(this.storageKey) || "[]").map((w: WeightLog) => {
      w.date = new Date(w.date);
      return w;
    });
  }

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.weightHistory));
  }

  clear() {
    this.weightHistory = [];
    localStorage.removeItem(this.storageKey);
  }

  add(weight: WeightLog): Promise<WeightLog | null> {
    return new Promise((resolve) => {
      weight.id = Math.random().toString(36).substring(2, 9);
      this.weightHistory.push(weight);
      this.save();
      resolve(weight);
    });
  }

  update(weightId: string, data: WeightLog): Promise<WeightLog | null> {
    return new Promise((resolve) => {
      const weight = this.weightHistory.find((w) => w.id === weightId);
      if (weight) {
        Object.assign(weight, data);
        this.save();
        resolve(weight);
      }
      resolve(null);
    });
  }

  delete(weightLog: WeightLog): Promise<boolean> {
    return new Promise((resolve) => {
      const weight = this.weightHistory.find((w) => w.id === weightLog.id);
      if (weight) {
        this.weightHistory = this.weightHistory.filter(
          (w) => w.id !== weightLog.id
        );
        this.save();
        resolve(true);
      }
      resolve(false);
    });
  }

  getAll(params: { userId: string }): Promise<WeightLog[]> {
    return new Promise((resolve) => {
      resolve(this.weightHistory.filter((w) => w.userId === params.userId).sort((a, b) => b.date.getTime() - a.date.getTime()));
    });
  }

  async getCurrentWeight(params: { userId: string }): Promise<WeightLog | null> {
    const weightLogs = await this.getAll(params);
    const [currentWeight] = weightLogs.slice(-1);
    return currentWeight;
  }
}

export default new WeightHistoryService();
