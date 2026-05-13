export const PROGRESS_STORAGE_KEY = "java-tutorial-lab:progress:v1";

export type ProgressState = {
  completedChapters: string[];
  lastVisitedPage: string;
  updatedAt: string;
};

const defaultProgress: ProgressState = {
  completedChapters: [],
  lastVisitedPage: "#/",
  updatedAt: new Date(0).toISOString()
};

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") {
    return defaultProgress;
  }

  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) {
      return defaultProgress;
    }

    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      completedChapters: Array.isArray(parsed.completedChapters)
        ? parsed.completedChapters.filter((item): item is string => typeof item === "string")
        : [],
      lastVisitedPage: typeof parsed.lastVisitedPage === "string" ? parsed.lastVisitedPage : "#/",
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString()
    };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: ProgressState): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    PROGRESS_STORAGE_KEY,
    JSON.stringify({
      ...progress,
      completedChapters: Array.from(new Set(progress.completedChapters)).sort(),
      updatedAt: new Date().toISOString()
    })
  );
}

export function clearProgress(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
}
