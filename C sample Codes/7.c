#include <stdio.h>

int main() {
    int num = 12345, reverse = 0, remainder;
    while (num != 0) {
        remainder = num % 10;
        reverse = reverse * 10 + remainder;
        num /= 10;
    }
    printf("%d", reverse);
    return 0;
}