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

struct node//�������ÿһ���ڵ�
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
/*
���������----�ݹ�ʵ��
*/
void build(int p)
{
    long oFile = 0;
    struct _finddata_t fileinfo;  //�����ļ���Ϣ�Ľṹ��
    string str;
    if ((oFile=_findfirst(str.assign(a[p].my_path).append("\\*").c_str(),&fileinfo)) != -1) {
        do{
            if((fileinfo.attrib&_A_SUBDIR)){//�Ƚ��ļ������Ƿ����ļ���
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
/*
������������----�ݹ�ʵ��
*/
void print(int p)
{
    if(p>=alen)        return;
    //�����ǰ�ڵ��name������Ϊ   a[p].deep
    for(int i=0;i<a[p].deep;i++)
        printf("\t");//    \tΪһ������
    printf("|_*%s\n",a[p].name.c_str());
    //�����ݹ鵱ǰ�ڵ�����ļ���
    for(int i=0;i<a[p].dlen;i++)
        print(a[p].d[i]);
    //�����ǰ�ڵ���ļ�������Ϊ     a[p].deep+1
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
        //��������
        system("CLS");
        printf("�������ļ�·�������϶��ļ��е��˴�");
        getline(cin,str);
		
		if(_access(str.c_str(),0)!=-1){
                a[0].name=a[0].my_path=str;
                a[0].deep=0;
                flag=true;
        }
        //�����ȡ����Ч·����ִ�г��������ļ�Ŀ¼�ṹ�����������
        if(flag){
            build(0);
            printf("���ɵ��ļ�Ŀ¼��Ϊ��\n\n");
            print(0);
        }
        else
            printf("����·�������ڻ�·��ָ��Ϊ�ļ�Ŀ¼�ṹ\n");
        printf("\n\n���������ַ�������һ�������ļ�Ŀ¼�ṹ\n");
//        getchar();
        system("pause");
    }
    return 0;
}
