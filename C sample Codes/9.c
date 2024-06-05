#include <stdio.h>

int main() {
    int n = 5, t1 = 0, t2 = 1, nextTerm;
    printf("%d, %d", t1, t2);
    for (int i = 1; i <= n - 2; ++i) {
        nextTerm = t1 + t2;
        printf(", %d", nextTerm);
        t1 = t2;
        t2 = nextTerm;
    }
    printf("\n");
    return 0;
}