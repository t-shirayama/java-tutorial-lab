package lab.numbers;

import java.math.BigDecimal;
import java.math.BigInteger;

public class NumbersApp {
    public static void main(String[] args) {
        double floating = 0.1 + 0.2;
        int bits = 0b1010;
        BigInteger large = new BigInteger("12345678901234567890");
        BigDecimal price = new BigDecimal("0.1").add(new BigDecimal("0.2"));

        System.out.println("double: " + floating);
        System.out.println("cast: " + (int) 12.9);
        System.out.println("boxed: " + Integer.valueOf(42));
        System.out.println("bits & 0b0110: " + (bits & 0b0110));
        System.out.println("big integer: " + large.add(BigInteger.TEN));
        System.out.println("big decimal: " + price);
    }
}
