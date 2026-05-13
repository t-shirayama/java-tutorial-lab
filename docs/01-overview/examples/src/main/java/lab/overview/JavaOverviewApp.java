package lab.overview;

public class JavaOverviewApp {
    public static void main(String[] args) {
        System.out.println("Javaチュートリアルへようこそ");
        System.out.println("Java version: " + System.getProperty("java.version"));
        System.out.println("Java vendor: " + System.getProperty("java.vendor"));
        System.out.println("Runtime version: " + Runtime.version());
        System.out.println("OS: " + System.getProperty("os.name") + " " + System.getProperty("os.version"));
    }
}
