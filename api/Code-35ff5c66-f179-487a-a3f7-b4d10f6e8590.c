#include<stdio.h>
#include<string.h>
int main(){

    int t;
    scanf("%d\n", &t);
    while(t--){

    char c[1000],s[1000];

    gets(c);


   if(c[0]=='s' && c[1]=='i' && c[2]=='m' && c[3]=='o' && c[4]=='n' && c[6]=='s' && c[7]=='a' && c[8]=='y' && c[9]=='s'){

     for(int i=11; i<strlen(c);i++){

        printf("%c", c[i]);
     }
   }

        printf("\n");

    }

return 0;
}

  // if(c[0]=="s" && c[1]=="i" && c[2]=="m" && c[3]=="o" && c[4]=="n" && c[5]=="\0" && c[6]=="s" && c[7]=="a" && c[8]=="y" && c[9]=="s"){
