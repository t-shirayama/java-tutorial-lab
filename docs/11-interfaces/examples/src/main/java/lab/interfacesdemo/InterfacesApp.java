package lab.interfacesdemo;

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

    @FunctionalInterface
    interface Formatter {
        String format(String value);
    }

    public static void main(String[] args) {
        Notifier notifier = new ConsoleNotifier();
        Formatter formatter = value -> "topic=" + value;
        notifier.notifyStart();
        notifier.notify(formatter.format("interface"));
    }
}
