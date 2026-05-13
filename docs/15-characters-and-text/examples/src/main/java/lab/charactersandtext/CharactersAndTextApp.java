package lab.charactersandtext;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;

public class CharactersAndTextApp {
    public static void main(String[] args) {
        String text = "Java入門";
        byte[] bytes = text.getBytes(StandardCharsets.UTF_8);

        System.out.println("text: " + text);
        System.out.println("length: " + text.length());
        System.out.println("code points: " + text.codePointCount(0, text.length()));
        System.out.println("utf-8 bytes: " + bytes.length);
        System.out.println("bytes: " + Arrays.toString(bytes));
        System.out.println("decoded: " + new String(bytes, StandardCharsets.UTF_8));
    }
}
