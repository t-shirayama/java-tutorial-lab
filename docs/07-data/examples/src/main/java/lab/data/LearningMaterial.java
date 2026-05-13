package lab.data;

public sealed interface LearningMaterial permits BookMaterial, VideoMaterial {
    String displayName();
}
