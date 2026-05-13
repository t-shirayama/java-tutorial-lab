package lab.numbers;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;

public class NumbersApp {
    public static void main(String[] args) {
        double floating = 0.1 + 0.2;
        int bits = 0b1010;
        BigInteger large = new BigInteger("12345678901234567890");
        BigDecimal exactPrice = new BigDecimal("0.1").add(new BigDecimal("0.2"));
        BigDecimal fromDouble = new BigDecimal(0.1);
        BigDecimal valueOfDouble = BigDecimal.valueOf(0.1);
        BigDecimal divided = BigDecimal.ONE.divide(new BigDecimal("3"), 2, RoundingMode.HALF_UP);

        System.out.println("double: " + floating);
        System.out.println("cast: " + (int) 12.9);
        System.out.println("boxed: " + Integer.valueOf(42));
        System.out.println("bits & 0b0110: " + (bits & 0b0110));
        System.out.println("big integer: " + large.add(BigInteger.TEN));
        System.out.println("new BigDecimal(\"0.1\") + new BigDecimal(\"0.2\"): " + exactPrice);
        System.out.println("new BigDecimal(0.1): " + fromDouble);
        System.out.println("BigDecimal.valueOf(0.1): " + valueOfDouble);
        System.out.println("1 / 3 rounded to 2 digits: " + divided);
    }
}
