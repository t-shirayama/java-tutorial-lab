package lab.integersandbooleans;

public class IntegersAndBooleansApp {
    public static void main(String[] args) {
        showIntegerOperations();
        showTypeConversion();
        showStringConversion();
        showBooleans();
    }

    private static void showIntegerOperations() {
        int total = 17;
        int groupSize = 5;
        int groups = total / groupSize;
        int remainder = total % groupSize;

        System.out.println("== 整数の演算 ==");
        System.out.println("total: " + total);
        System.out.println("groupSize: " + groupSize);
        System.out.println("groups: " + groups);
        System.out.println("remainder: " + remainder);
        System.out.println();
    }

    private static void showTypeConversion() {
        int intValue = 120;
        long longValue = intValue;
        int castValue = (int) longValue;

        System.out.println("== 型変換 ==");
        System.out.println("int to long: " + longValue);
        System.out.println("long to int: " + castValue);
        System.out.println();
    }

    private static void showStringConversion() {
        String parsedScoreText = "85";
        int parsedScore = Integer.parseInt(parsedScoreText);
        String scoreText = Integer.toString(parsedScore) + "点";

        System.out.println("== 数値と文字列 ==");
        System.out.println("parsed score: " + parsedScore);
        System.out.println("score text: " + scoreText);
        System.out.println();
    }

    private static void showBooleans() {
        String parsedScoreText = "85";
        int score = Integer.parseInt(parsedScoreText);
        boolean passed = score >= 70;
        String enabledText = "true";
        boolean featureEnabled = Boolean.parseBoolean(enabledText);

        System.out.println("== ブーリアン ==");
        System.out.println("passed: " + passed);
        System.out.println("feature enabled: " + featureEnabled);
    }
}
