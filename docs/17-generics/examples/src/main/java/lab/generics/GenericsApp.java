package lab.generics;

import java.util.ArrayList;
import java.util.List;

public class GenericsApp {
    static class Box<T> {
        private final T value;

        Box(T value) {
            this.value = value;
        }

        T value() {
            return value;
        }
    }

    public static void main(String[] args) {
        Box<String> topic = new Box<>("ジェネリック");
        List<Box<String>> boxes = List.of(topic, new Box<>("型安全"));
        boxes.forEach(box -> System.out.println(box.value()));

        List<Integer> scores = List.of(80, 95, 100);
        System.out.println("sum: " + sum(scores));

        List<Number> numbers = new ArrayList<>();
        addDefaultScores(numbers);
        System.out.println("numbers: " + numbers);
    }

    static double sum(List<? extends Number> values) {
        double total = 0;
        for (Number value : values) {
            total += value.doubleValue();
        }
        return total;
    }

    static void addDefaultScores(List<? super Integer> output) {
        output.add(70);
        output.add(85);
    }
}
