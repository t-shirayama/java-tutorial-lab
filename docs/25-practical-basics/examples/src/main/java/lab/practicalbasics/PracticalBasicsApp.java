package lab.practicalbasics;

import java.io.IOException;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class PracticalBasicsApp {
    private static final System.Logger LOGGER = System.getLogger("lab.practicalbasics");

    public static void main(String[] args) throws IOException {
        LOGGER.log(System.Logger.Level.INFO, "実務入口サンプルを開始します");

        System.out.println("=== null ===");
        System.out.println(PracticalBasics.greeting("Java"));
        System.out.println(PracticalBasics.greeting(null));

        System.out.println();
        System.out.println("=== ファイル入出力 ===");
        Path memoPath = Path.of("target", "memo.txt");
        String memo = "Java学習メモ: null、テスト、ファイル、日付時刻、ログ";
        System.out.println(PracticalBasics.writeAndReadMemo(memoPath, memo));

        System.out.println();
        System.out.println("=== 日付時刻 ===");
        System.out.println(PracticalBasics.formatDate(LocalDate.of(2026, 5, 13)));
        System.out.println(PracticalBasics.formatDateTime(LocalDateTime.of(2026, 5, 13, 9, 30)));

        LOGGER.log(System.Logger.Level.INFO, "実務入口サンプルを終了します");
    }
}
