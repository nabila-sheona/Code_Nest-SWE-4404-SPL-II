#include <stdio.h>
#include <stdbool.h>

int main() {
    int n = 29;
    bool isPrime = true;

    if (n == 0 || n == 1) {
        isPrime = false;
    } else {
        for (int i = 2; i <= n / 2; ++i) {
            if (n % i == 0) {
                isPrime = false;
                break;
            }
        }
    }

    if (isPrime)
        printf("yes", n);
    else
        printf("no", n);

    return 0;
}