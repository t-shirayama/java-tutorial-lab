package lab.ffmapi;

import java.nio.ByteBuffer;

public class FfmApiApp {
    public static void main(String[] args) throws ClassNotFoundException {
        Class<?> arenaClass = Class.forName("java.lang.foreign.Arena");
        ByteBuffer directBuffer = ByteBuffer.allocateDirect(Integer.BYTES);
        directBuffer.putInt(21);
        directBuffer.flip();

        System.out.println("FFM package class: " + arenaClass.getName());
        System.out.println("direct buffer: " + directBuffer.isDirect());
        System.out.println("value: " + directBuffer.getInt());
    }
}
