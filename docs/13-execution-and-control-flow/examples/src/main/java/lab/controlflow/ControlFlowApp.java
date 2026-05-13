package lab.controlflow;

public class ControlFlowApp {
    public static void main(String[] args) {
        int score = 82;
        String level = score >= 80 ? "advanced" : "basic";
        String message = switch (level) {
            case "advanced" -> "応用へ進めます";
            case "basic" -> "基礎を復習します";
            default -> "確認します";
        };

        System.out.println("java version: " + System.getProperty("java.version"));
        System.out.println(message);

        String[] topics = {"if", "switch", "for", "stop", "while"};
        for (String topic : topics) {
            if ("stop".equals(topic)) {
                break;
            }
            System.out.println("topic: " + topic);
        }
    }
}
