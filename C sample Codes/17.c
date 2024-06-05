#include <stdio.h>
#include <string.h>

int main() {
    char str[] = "hello", rev[100];
    int len, i, j;

    len = strlen(str);
    j = len - 1;

    for (i = 0; i < len; i++) {
        rev[i] = str[j];
        j--;
    }
    rev[i] = '\0';

    printf("%s\n", rev);
    return 0;
}