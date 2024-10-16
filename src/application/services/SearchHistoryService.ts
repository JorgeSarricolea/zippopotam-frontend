export class SearchHistoryService {
  private static readonly STORAGE_KEY = "searchHistory";

  static getHistory(): Array<{ zipCode: string; state: string; city: string }> {
    const history = sessionStorage.getItem(this.STORAGE_KEY);
    return history ? JSON.parse(history) : [];
  }

  static saveHistory(
    history: Array<{ zipCode: string; state: string; city: string }>
  ) {
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
  }

  static clearHistory() {
    sessionStorage.removeItem(this.STORAGE_KEY);
  }
}
