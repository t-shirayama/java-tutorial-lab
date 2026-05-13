package lab.ffmapi;

import java.nio.ByteBuffer;

public class FfmApiApp {
    public static void main(String[] args) throws ClassNotFoundException {
        Class<?> arenaClass = Class.forName("java.lang.foreign.Arena");
        Class<?> memorySegmentClass = Class.forName("java.lang.foreign.MemorySegment");
        ByteBuffer directBuffer = ByteBuffer.allocateDirect(Integer.BYTES * 2);
        directBuffer.putInt(21);
        directBuffer.putInt(2026);
        directBuffer.flip();

        System.out.println("FFM package class: " + arenaClass.getName());
        System.out.println("FFM memory class: " + memorySegmentClass.getName());
        System.out.println("direct buffer: " + directBuffer.isDirect());
        System.out.println("values: " + directBuffer.getInt() + ", " + directBuffer.getInt());
        System.out.println("note: Java 21 needs --enable-preview for direct FFM source code.");
    }
}
