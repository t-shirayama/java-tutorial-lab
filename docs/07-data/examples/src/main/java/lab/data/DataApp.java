package lab.data;

public class DataApp {
    public static void main(String[] args) {
        showRecord();
        showEnum();
        showSealedTypes();
    }

    private static void showRecord() {
        Article article = new Article("Javaのデータ表現", DataConstants.DEFAULT_READING_MINUTES);

        System.out.println("== レコードクラス ==");
        System.out.println(article);
        System.out.println("title: " + article.title());
        System.out.println();
    }

    private static void showEnum() {
        ReadingStatus status = ReadingStatus.READING;

        System.out.println("== enum型 ==");
        System.out.println("status: " + status);
        System.out.println("label: " + status.label());
        System.out.println();
    }

    private static void showSealedTypes() {
        LearningMaterial book = new BookMaterial("Java基礎");
        LearningMaterial video = new VideoMaterial("recordとenum");

        System.out.println("== シール型 ==");
        System.out.println(book.displayName());
        System.out.println(video.displayName());
    }
}
