package lab.concurrencycontrol;

import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

public class ConcurrencyControlApp {
    public static void main(String[] args) {
        AtomicInteger counter = new AtomicInteger();

        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 5; i++) {
                executor.submit(counter::incrementAndGet);
            }
        }

        System.out.println("counter: " + counter.get());
    }
}
