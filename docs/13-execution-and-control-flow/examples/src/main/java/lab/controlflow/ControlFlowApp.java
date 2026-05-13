package lab.controlflow;

public class ControlFlowApp {
    public static void main(String[] args) {
        int score = 82;
        String level;
        if (score >= 90) {
            level = "expert";
        } else if (score >= 80) {
            level = "advanced";
        } else {
            level = "basic";
        }

        String message = switch (level) {
            case "expert" -> "発展課題へ進めます";
            case "advanced" -> "応用へ進めます";
            case "basic" -> "基礎を復習します";
            default -> "確認します";
        };

        System.out.println("java version: " + System.getProperty("java.version"));
        System.out.println(message);

        String[] topics = {"if", "switch", "skip", "for", "stop", "while"};
        for (String topic : topics) {
            if ("skip".equals(topic)) {
                continue;
            }
            if ("stop".equals(topic)) {
                break;
            }
            System.out.println("topic: " + topic);
        }

        int count = 0;
        while (count < 3) {
            System.out.println("while count: " + count);
            count++;
        }
    }
}
