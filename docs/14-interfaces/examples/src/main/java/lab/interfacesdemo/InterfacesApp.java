package lab.interfacesdemo;

import java.util.ArrayList;
import java.util.List;

public class InterfacesApp {
    interface Notifier {
        void notify(String message);

        default void notifyStart() {
            notify("学習を開始します");
        }
    }

    static class ConsoleNotifier implements Notifier {
        @Override
        public void notify(String message) {
            System.out.println("[console] " + message);
        }
    }

    static class MemoryNotifier implements Notifier {
        private final List<String> messages = new ArrayList<>();

        @Override
        public void notify(String message) {
            messages.add(message);
        }

        List<String> messages() {
            return List.copyOf(messages);
        }
    }

    @FunctionalInterface
    interface Formatter {
        String format(String value);
    }

    public static void main(String[] args) {
        Notifier consoleNotifier = new ConsoleNotifier();
        MemoryNotifier memoryNotifier = new MemoryNotifier();
        Formatter formatter = value -> "topic=" + value;

        sendLearningMessage(consoleNotifier, formatter, "interface");
        sendLearningMessage(memoryNotifier, formatter, "polymorphism");
        sendLearningMessage(memoryNotifier, value -> "[" + value.toUpperCase() + "]", "default method");

        System.out.println("memory: " + memoryNotifier.messages());
    }

    private static void sendLearningMessage(Notifier notifier, Formatter formatter, String topic) {
        notifier.notifyStart();
        notifier.notify(formatter.format(topic));
    }
}
