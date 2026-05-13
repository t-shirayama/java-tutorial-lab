package lab.data;

public final class VideoMaterial implements LearningMaterial {
    private final String title;

    public VideoMaterial(String title) {
        this.title = title;
    }

    @Override
    public String displayName() {
        return "動画: " + title;
    }
}
