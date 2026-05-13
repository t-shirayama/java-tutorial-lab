package lab.concurrencycontrol;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.atomic.AtomicInteger;

public class ConcurrencyControlApp {
    public static void main(String[] args) throws Exception {
        UnsafeCounter unsafeCounter = new UnsafeCounter();
        AtomicInteger safeCounter = new AtomicInteger();

        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            List<Future<?>> futures = new ArrayList<>();
            for (int i = 0; i < 1_000; i++) {
                futures.add(executor.submit(() -> {
                    unsafeCounter.increment();
                    safeCounter.incrementAndGet();
                }));
            }

            for (Future<?> future : futures) {
                future.get();
            }
        }

        System.out.println("unsafe counter: " + unsafeCounter.value());
        System.out.println("atomic counter: " + safeCounter.get());
    }

    static class UnsafeCounter {
        private int value;

        void increment() {
            value++;
        }

        int value() {
            return value;
        }
    }
}
