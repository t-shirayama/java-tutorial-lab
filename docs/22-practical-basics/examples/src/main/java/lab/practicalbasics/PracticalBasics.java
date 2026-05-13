package lab.practicalbasics;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

public final class PracticalBasics {
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy/MM/dd");
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm");

    private PracticalBasics() {
    }

    public static String greeting(String name) {
        String displayName = Objects.requireNonNullElse(name, "ゲスト");
        return "こんにちは、" + displayName + "さん";
    }

    public static String writeAndReadMemo(Path path, String memo) throws IOException {
        Files.createDirectories(path.getParent());
        Files.writeString(path, memo);
        return Files.readString(path);
    }

    public static String formatDate(LocalDate date) {
        return date.format(DATE_FORMATTER);
    }

    public static String formatDateTime(LocalDateTime dateTime) {
        return dateTime.format(DATE_TIME_FORMATTER);
    }
}
