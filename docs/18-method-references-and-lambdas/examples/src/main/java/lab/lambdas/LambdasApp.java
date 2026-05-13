package lab.lambdas;

import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.IntUnaryOperator;
import java.util.function.Predicate;
import java.util.function.Supplier;

public class LambdasApp {
    public static void main(String[] args) {
        List<String> names = List.of("java", "maven", "api", "stream");
        Predicate<String> longName = name -> name.length() >= 4;
        Function<String, String> upperCase = String::toUpperCase;
        Function<String, String> label = text -> "学習: " + text;
        Consumer<String> printer = System.out::println;
        Supplier<String> fallbackTopic = () -> "復習";
        IntUnaryOperator addOne = value -> value + 1;
        IntUnaryOperator doubleValue = value -> value * 2;

        System.out.println("== filter + map + method reference ==");
        names.stream()
                .filter(longName)
                .map(upperCase.andThen(label))
                .forEach(printer);

        System.out.println("== function interface roles ==");
        System.out.println("Predicate: " + longName.test("api"));
        System.out.println("Function: " + upperCase.apply("lambda"));
        System.out.println("Supplier: " + fallbackTopic.get());

        System.out.println("== composition order ==");
        System.out.println("addOne.andThen(doubleValue): " + addOne.andThen(doubleValue).applyAsInt(3));
        System.out.println("doubleValue.andThen(addOne): " + doubleValue.andThen(addOne).applyAsInt(3));
    }
}
