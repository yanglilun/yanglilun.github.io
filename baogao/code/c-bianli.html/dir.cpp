#include <iostream>
#include<stdio.h>
#include<stdlib.h>
#include<io.h>
#include<fstream>
#include<tchar.h>
#include<string.h>
#include <shlobj.h>
#include<vector>
using namespace std;

struct node
{
    string name,my_path;
    vector<string>file_name;
    int d[100],dlen;
    int deep;
}a[1000000];
int alen=1;
void array_init()
{
    for(int i=0;i<=alen;i++){
        memset(a[i].d,0,sizeof a[i].d);
        a[i].dlen=0;
        a[i].deep=0;
        a[i].file_name.clear();
        a[i].name=a[i].my_path="";
    }
    alen=1;
}

void build(int p)
{
    long oFile = 0;
    struct _finddata_t fileinfo; 
    string str;
    if ((oFile=_findfirst(str.assign(a[p].my_path).append("\\*").c_str(),&fileinfo)) != -1) {
        do{
            if((fileinfo.attrib&_A_SUBDIR)){
                if(strcmp(fileinfo.name,".")!=0&&strcmp(fileinfo.name,"..")!=0) {
                    a[alen].name=fileinfo.name;
                    a[alen].deep=a[p].deep+1;
                    a[alen].dlen=0;
                    a[alen].my_path=str.assign(a[p].my_path).append("\\").append(fileinfo.name);
                    alen++;
                    a[p].d[a[p].dlen++]=alen-1;
                    build(alen-1);
                }
            }
            else
                a[p].file_name.push_back(fileinfo.name);
        } while(_findnext(oFile,&fileinfo)==0);
        _findclose(oFile);
    }
}

void print(int p)
{
    if(p>=alen)        return;
    for(int i=0;i<a[p].deep;i++)
    printf("|_*%s\n",a[p].name.c_str());
    for(int i=0;i<a[p].dlen;i++)
        print(a[p].d[i]);
    for(int i=0;i<a[p].file_name.size();i++){
        for(int j=0;j<a[p].deep+1;j++)
            printf("\t");
        printf("|_%s\n",a[p].file_name[i].c_str());
    }
}
int main()
{
    while(1){
        string str;
        bool flag=false;
        system("CLS");
        printf("请输入文件路径或者拖动文件夹到此处");
        getline(cin,str);
		
		if(_access(str.c_str(),0)!=-1){
                a[0].name=a[0].my_path=str;
                a[0].deep=0;
                flag=true;
        }
        if(flag){
            build(0);
            printf("生成的文件目录树为：\n\n");
            print(0);
        }
        else
            printf("输入路径不存在或路径指向不为文件目录结构\n");
        printf("\n\n输入任意字符继续下一次生成文件目录结构\n");
        system("pause");
    }
    return 0;
}
