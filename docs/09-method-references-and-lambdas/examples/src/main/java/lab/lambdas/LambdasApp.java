package lab.lambdas;

import java.util.List;
import java.util.function.Function;
import java.util.function.IntUnaryOperator;
import java.util.function.Predicate;

public class LambdasApp {
    public static void main(String[] args) {
        List<String> names = List.of("java", "maven", "api");
        Predicate<String> longName = name -> name.length() >= 4;
        Function<String, String> label = String::toUpperCase;
        IntUnaryOperator addOne = value -> value + 1;
        IntUnaryOperator doubleValue = value -> value * 2;

        names.stream()
                .filter(longName)
                .map(label.andThen(text -> "学習: " + text))
                .forEach(System.out::println);

        System.out.println("compose: " + addOne.andThen(doubleValue).applyAsInt(3));
    }
}
