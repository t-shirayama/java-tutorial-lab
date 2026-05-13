package lab.webtechnologies;

import java.io.ByteArrayOutputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class WebTechnologiesApp {
    public static void main(String[] args) throws Exception {
        try (HttpClient client = HttpClient.newHttpClient()) {
            HttpRequest request = HttpRequest.newBuilder(URI.create("https://example.com/")).GET().build();
            System.out.println("http method: " + request.method());
            System.out.println("client class: " + client.getClass().getName());
        }

        String csv = "title,minutes\nJava,30";
        System.out.println("csv columns: " + Arrays.toString(csv.lines().findFirst().orElse("").split(",")));
        System.out.println("zip bytes: " + zipBytes(csv).length);

        Map<String, Object> lesson = Map.of("title", "Java", "minutes", 30);
        System.out.println("manual JSON: " + toTinyJson(lesson));
        System.out.println("library hint: use Jackson/Gson/JSON-B when escaping, arrays, nested objects, or schema rules matter.");
    }

    private static byte[] zipBytes(String text) throws Exception {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        try (ZipOutputStream zip = new ZipOutputStream(output)) {
            zip.putNextEntry(new ZipEntry("lesson.csv"));
            zip.write(text.getBytes(StandardCharsets.UTF_8));
            zip.closeEntry();
        }
        return output.toByteArray();
    }

    private static String toTinyJson(Map<String, Object> values) {
        return "{"
                + "\"title\":\"" + values.get("title") + "\","
                + "\"minutes\":" + values.get("minutes")
                + "}";
    }
}
