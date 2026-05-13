package lab.operators;

public class OperatorsApp {
    public static void main(String[] args) {
        int completed = 3;
        int total = 5;
        int remaining = total - completed;
        int integerDivision = total / completed;
        double decimalDivision = (double) total / completed;
        boolean isEvenTotal = total % 2 == 0;
        boolean canStart = completed > 0 && remaining > 0;
        String label = canStart ? "継続中" : "確認が必要";
        String topic = "Java";
        boolean sameTopic = "Java".equals(topic);

        System.out.println("remaining: " + remaining);
        System.out.println("progress: " + completed + "/" + total);
        System.out.println("string concat without parentheses: " + "progress: " + completed + total);
        System.out.println("string concat with parentheses: " + "progress: " + (completed + total));
        System.out.println("integer division: " + integerDivision);
        System.out.println("decimal division: " + decimalDivision);
        System.out.println("is even total: " + isEvenTotal);
        System.out.println("canStart: " + canStart);
        System.out.println("label: " + label);
        System.out.println("same topic: " + sameTopic);
    }
}
