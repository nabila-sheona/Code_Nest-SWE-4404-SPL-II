#include <stdio.h>

unsigned long long factorial(int n) {
    if (n <= 1) return 1;
    else return n * factorial(n - 1);
}

int main() {
    int num = 6;
    printf("%llu", factorial(num));
    return 0;
}