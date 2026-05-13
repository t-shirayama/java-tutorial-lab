package lab.threads;

import java.util.concurrent.Executors;

public class ThreadsApp {
    public static void main(String[] args) throws InterruptedException {
        Thread platform = Thread.ofPlatform().start(() -> System.out.println("platform: " + Thread.currentThread()));
        platform.join();

        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 1; i <= 3; i++) {
                int number = i;
                executor.submit(() -> System.out.println("virtual task: " + number));
            }
        }
    }
}
