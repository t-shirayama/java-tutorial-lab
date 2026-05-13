package lab.exceptions;

public class ExceptionsApp {
    public static void main(String[] args) {
        try {
            int score = parseScore("85");
            System.out.println("score: " + score);
            parseScore("invalid");
        } catch (InvalidScoreException exception) {
            System.out.println("error: " + exception.getMessage());
        }

        try {
            parseScore("-1");
        } catch (InvalidScoreException exception) {
            System.out.println("range error: " + exception.getMessage());
        }

        try (StudyResource resource = new StudyResource("例外処理")) {
            resource.use();
        }

        try (StudyResource resource = new StudyResource("失敗するリソース", true)) {
            resource.use();
        } catch (IllegalStateException exception) {
            System.out.println("resource error: " + exception.getMessage());
        }
    }

    private static int parseScore(String text) {
        try {
            int score = Integer.parseInt(text);
            if (score < 0 || score > 100) {
                throw new InvalidScoreException("0から100の範囲で指定してください: " + text);
            }
            return score;
        } catch (NumberFormatException exception) {
            throw new InvalidScoreException("数値として読めません: " + text);
        }
    }

    static class InvalidScoreException extends RuntimeException {
        InvalidScoreException(String message) {
            super(message);
        }
    }

    static class StudyResource implements AutoCloseable {
        private final String name;
        private final boolean failOnUse;

        StudyResource(String name) {
            this(name, false);
        }

        StudyResource(String name, boolean failOnUse) {
            this.name = name;
            this.failOnUse = failOnUse;
        }

        void use() {
            System.out.println("use: " + name);
            if (failOnUse) {
                throw new IllegalStateException("リソース利用中に失敗しました: " + name);
            }
        }

        @Override
        public void close() {
            System.out.println("close: " + name);
        }
    }
}
