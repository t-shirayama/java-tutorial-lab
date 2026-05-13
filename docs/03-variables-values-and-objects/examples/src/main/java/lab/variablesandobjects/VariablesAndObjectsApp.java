package lab.variablesandobjects;

public class VariablesAndObjectsApp {
    public static void main(String[] args) {
        showPrimitiveAssignment();
        showReferenceAssignment();
        showSeparateObjects();
        showDefaultValues();
    }

    private static void showPrimitiveAssignment() {
        int original = 10;
        int copied = original;
        original = 20;

        System.out.println("== 基本型の代入 ==");
        System.out.println("original: " + original);
        System.out.println("copied: " + copied);
        System.out.println();
    }

    private static void showReferenceAssignment() {
        ReadingItem first = new ReadingItem("Java入門", 120);
        ReadingItem second = first;
        first.rename("Java入門 改訂版");

        System.out.println("== 参照型の代入 ==");
        System.out.println("first: " + first);
        System.out.println("second: " + second);
        System.out.println("same object: " + (first == second));
        System.out.println();
    }

    private static void showSeparateObjects() {
        ReadingItem first = new ReadingItem("Java入門", 120);
        ReadingItem second = new ReadingItem("Java入門", 120);

        System.out.println("== 別々のオブジェクト ==");
        System.out.println("same object: " + (first == second));
        System.out.println();
    }

    private static void showDefaultValues() {
        DefaultValues values = new DefaultValues();

        System.out.println("== デフォルト初期値 ==");
        values.printValues();
    }
}
