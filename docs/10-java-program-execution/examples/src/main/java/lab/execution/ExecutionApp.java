package lab.execution;

public class ExecutionApp {
    public static void main(String[] args) {
        System.out.println("Javaプログラムを実行しました");
        System.out.println("java version: " + System.getProperty("java.version"));

        if (args.length == 0) {
            System.out.println("args: 引数はありません");
            return;
        }

        System.out.println("args count: " + args.length);
        for (int i = 0; i < args.length; i++) {
            System.out.println("args[" + i + "]: " + args[i]);
        }
    }
}
