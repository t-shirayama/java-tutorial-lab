package lab.strings;

public class StringExamplesApp {
    public static void main(String[] args) {
        showStringBasics();
        showStringBuilder();
        showStringComparison();
        showObjectToString();
    }

    private static void showStringBasics() {
        String rawText = "  Java 21  ";
        String strippedText = rawText.strip();

        System.out.println("== 文字列 ==");
        System.out.println("元の文字列: " + rawText);
        System.out.println("strip後: " + strippedText);
        System.out.println("元の文字列は変わらない: " + rawText);
        System.out.println();
    }

    private static void showStringBuilder() {
        StringBuilder builder = new StringBuilder();
        builder.append("文字列");
        builder.append(" -> ");
        builder.append("StringBuilder");
        builder.append(" -> ");
        builder.append("equals");
        builder.append(" -> ");
        builder.append("toString");

        System.out.println("== 書き換え可能文字列 ==");
        System.out.println("学習メニュー: " + builder);
        System.out.println();
    }

    private static void showStringComparison() {
        String literalText = "java";
        String constructedText = new String("java");
        String upperText = "JAVA";

        System.out.println("== 文字列の比較 ==");
        System.out.println("equals: " + literalText.equals(constructedText));
        System.out.println("==: " + (literalText == constructedText));
        System.out.println("equalsIgnoreCase: " + literalText.equalsIgnoreCase(upperText));
        System.out.println();
    }

    private static void showObjectToString() {
        StudyTopic topic = new StudyTopic("文字列", "基本");

        System.out.println("== オブジェクトの文字列変換 ==");
        System.out.println(topic);
    }
}
