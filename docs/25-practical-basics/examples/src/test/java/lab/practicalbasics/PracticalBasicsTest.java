package lab.practicalbasics;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;
import java.time.LocalDateTime;
import org.junit.jupiter.api.Test;

class PracticalBasicsTest {
    @Test
    void guestNameIsUsedWhenNameIsNull() {
        assertEquals("こんにちは、ゲストさん", PracticalBasics.greeting(null));
    }

    @Test
    void dateIsFormattedForDisplay() {
        assertEquals("2026/05/13", PracticalBasics.formatDate(LocalDate.of(2026, 5, 13)));
    }

    @Test
    void dateTimeIsFormattedForDisplay() {
        assertEquals("2026/05/13 09:30", PracticalBasics.formatDateTime(LocalDateTime.of(2026, 5, 13, 9, 30)));
    }
}
