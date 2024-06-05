#include <stdio.h>

int main() {
    int a = 56, b = 98, gcd;

    for (int i = 1; i <= a && i <= b; ++i) {
        if (a % i == 0 && b % i == 0)
            gcd = i;
    }
    printf("%d", gcd);
    return 0;
}