#include <stdio.h>

int main() {
    int year = 2024;

    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        printf("yes", year);
    } else {
        printf("no", year);
    }

    return 0;
}