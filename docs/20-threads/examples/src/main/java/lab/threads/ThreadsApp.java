package lab.threads;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class ThreadsApp {
    public static void main(String[] args) throws Exception {
        Thread platform = Thread.ofPlatform().start(() -> System.out.println("platform: " + Thread.currentThread()));
        platform.join();

        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            List<Future<String>> futures = new ArrayList<>();
            for (int i = 1; i <= 5; i++) {
                int number = i;
                Callable<String> task = () -> {
                    Thread.sleep(Duration.ofMillis(50));
                    return "virtual task " + number + " on " + Thread.currentThread();
                };
                futures.add(executor.submit(task));
            }

            for (Future<String> future : futures) {
                System.out.println(future.get());
            }
        }
    }
}
