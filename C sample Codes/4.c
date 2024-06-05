#include <stdio.h>

int main() {
    int num = 5, i;
    unsigned long long factorial = 1;

    for (i = 1; i <= num; ++i) {
        factorial *= i;
    }
    printf("%llu", factorial);
    return 0;
}