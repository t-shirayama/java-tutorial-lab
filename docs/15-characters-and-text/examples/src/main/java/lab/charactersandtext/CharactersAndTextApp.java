package lab.charactersandtext;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;

public class CharactersAndTextApp {
    public static void main(String[] args) {
        String text = "Java入門🍵";
        byte[] bytes = text.getBytes(StandardCharsets.UTF_8);

        System.out.println("text: " + text);
        System.out.println("UTF-16 code units (length): " + text.length());
        System.out.println("Unicode code points: " + text.codePointCount(0, text.length()));
        System.out.println("UTF-8 byte length: " + bytes.length);
        System.out.println("UTF-8 bytes: " + Arrays.toString(bytes));
        System.out.println("decoded from UTF-8: " + new String(bytes, StandardCharsets.UTF_8));

        System.out.println("\ncode points:");
        text.codePoints()
                .forEach(codePoint -> System.out.printf("U+%04X %s%n", codePoint, new String(Character.toChars(codePoint))));

        String block = """
                {
                  "title": "文字とUnicode",
                  "message": "%s"
                }
                """.formatted(text);
        System.out.println("\ntext block:");
        System.out.println(block);
    }
}
