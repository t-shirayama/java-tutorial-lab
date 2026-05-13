package lab.operators;

public class OperatorsApp {
    public static void main(String[] args) {
        int completed = 3;
        int total = 5;
        int remaining = total - completed;
        boolean canStart = completed > 0 && remaining > 0;
        String label = canStart ? "継続中" : "確認が必要";

        System.out.println("remaining: " + remaining);
        System.out.println("progress: " + completed + "/" + total);
        System.out.println("canStart: " + canStart);
        System.out.println("label: " + label);
    }
}
