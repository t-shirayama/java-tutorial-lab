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

        try (StudyResource resource = new StudyResource("例外処理")) {
            resource.use();
        }
    }

    private static int parseScore(String text) {
        try {
            return Integer.parseInt(text);
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

        StudyResource(String name) {
            this.name = name;
        }

        void use() {
            System.out.println("use: " + name);
        }

        @Override
        public void close() {
            System.out.println("close: " + name);
        }
    }
}
