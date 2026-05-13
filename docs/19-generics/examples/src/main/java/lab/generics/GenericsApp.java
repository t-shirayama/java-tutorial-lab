package lab.generics;

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
    }
}
