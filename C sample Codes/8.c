#include <stdio.h>

int main() {
    int num = 121, original = num, reverse = 0, remainder;
    while (num != 0) {
        remainder = num % 10;
        reverse = reverse * 10 + remainder;
        num /= 10;
    }
    if (original == reverse) {
        printf("yes", original);
    } else {
        printf("no", original);
    }
    return 0;
}