package lab.packagesdemo;

public class MessageFormatter {
    public static String format(String topic) {
        return "package topic: " + topic;
    }

    static String packagePrivateFormat(String topic) {
        return "package-private topic: " + topic;
    }
}
