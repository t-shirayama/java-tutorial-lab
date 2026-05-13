package lab.errorside;

public class ErrorsIdeDebuggingApp {
    public static void main(String[] args) {
        int completedSteps = 3;
        int totalSteps = 8;

        int progress = calculateProgress(completedSteps, totalSteps);

        System.out.println("=== エラーの読み方・IDE・デバッグ ===");
        System.out.println(formatProgress(completedSteps, totalSteps, progress));
        System.out.println("10 / 2 = " + divideSafely(10, 2));
        System.out.println("10 / 0 = " + divideSafely(10, 0));
    }

    static int calculateProgress(int completedSteps, int totalSteps) {
        if (totalSteps <= 0) {
            return 0;
        }
        return completedSteps * 100 / totalSteps;
    }

    static String formatProgress(int completedSteps, int totalSteps, int progress) {
        return "学習ステップ: " + completedSteps + "/" + totalSteps + " (" + progress + "%)";
    }

    static String divideSafely(int left, int right) {
        if (right == 0) {
            return "0では割れないため、計算をスキップしました";
        }
        return Integer.toString(left / right);
    }
}
