#include <stdio.h>
#include <stdlib.h>
#include <conio.h>
#include <time.h>
#include <Windows.h>
#define W 78  //游戏场地宽 
#define H 26  //游戏场地高 
int dir = 3;    //方向变量，初值3表示向左 
int Flag = 0;   //吃了食物的标志（1是0否） 
int score = 0;  //玩家得分 
struct food {
    int x;  //食物的x坐标 
    int y;  //食物的y坐标 
}fod;  //结构体food有两个成员 
struct snake {
    int len;      //蛇身长 
    int speed;  //移动速度 
    int x[100];  //蛇身某节x坐标 
    int y[100];  //蛇身某节y坐标 
}snk;   //结构体snk有4个成员 
void gtxy(int x, int y)  //控制光标移动的函数 
{
    COORD coord;
    coord.X = x;
    coord.Y = y;
    SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), coord);
}
void gtxy(int x, int y);  //以下声明要用到的几个自编函数 
void csh();  //初始化界面 
void keymove(); //按键操作移动蛇 
void putFod();  //投放食物 
int  Over();   //游戏结束（1是0否） 
void Color(int a);  //设定显示颜色的函数 
int main()   //主函数 
{
    csh();
    while (1)
    {
        Sleep(snk.speed);
        keymove();
        putFod();
        if (Over())
        {
            system("cls");
            gtxy(W / 2 + 1, H / 2); printf("游戏结束!T__T");
            gtxy(W / 2 + 1, H / 2 + 2); printf("玩家总分；%d分", score);
            _getch();
            break;
        }
    }
    return 0;
}
void csh()   //初始界面 
{
    int i;
    gtxy(0, 0);
    CONSOLE_CURSOR_INFO cursor_info = { 1,0 };  //以下两行是隐藏光标的设置 
    SetConsoleCursorInfo(GetStdHandle(STD_OUTPUT_HANDLE), &cursor_info);
    for (i = 0; i <= W; i = i + 2)  //横坐标要为偶数，因为这个要打印的字符占两个位置 
    {
        Color(2);   //设置打印颜色为绿色 
        gtxy(i, 0);  printf("■");  //打印上边框 
        gtxy(i, H); printf("■");  //打印下边框 
    }
    for (i = 1; i < H; i++)
    {
        gtxy(0, i); printf("■");  //打印左边框 
        gtxy(W, i); printf("■");  //打印右边框 
    }
    while (1)
    {
        srand((unsigned)time(NULL));  //初始化随机数发生器srand( )
        fod.x = rand() % (W - 4) + 2;  //随机函数rand( )产生一个从0到比（W-4）小1的数再加2 
        fod.y = rand() % (H - 2) + 1;  //随机函数rand( )产生一个从0到比（H-2）小1的数再加1 
        if (fod.x % 2 == 0) break;  //fod.x是食物的横坐标，要是2的倍数（为偶数） 
    }
    Color(12);   //设定打印颜色为淡红 
    gtxy(fod.x, fod.y); printf("●");  //到食物坐标处打印初始食物 
    snk.len = 3;      //蛇身长初值为3节 
    snk.speed = 350;  //刷新蛇的时间，即移动速度初值为350毫秒
    snk.x[0] = W / 2 + 1;  //蛇头横坐标要为偶数（因为W/2=39） 
    snk.y[0] = H / 2;    //蛇头纵坐标 
    Color(9);   //设定打印颜色为淡蓝 
    gtxy(snk.x[0], snk.y[0]);  printf("■");   //打印蛇头 
    for (i = 1; i < snk.len; i++)
    {
        snk.x[i] = snk.x[i - 1] + 2;  snk.y[i] = snk.y[i - 1];
        gtxy(snk.x[i], snk.y[i]);  printf("■");   //打印蛇身 
    }
    Color(7);   //恢复默认的白字黑底 
    return;
}
void keymove()  //按键操作移动蛇 
{
    int key;
    if (_kbhit())    //如有按键输入才执行下面操作 
    {
        key = _getch();
        if (key == 224)  //值为224表示按下了方向键，下面要再次获取键值 
        {
            key = _getch();
            if (key == 72 && dir != 2)dir = 1;  //72表示按下了向上方向键 
            if (key == 80 && dir != 1)dir = 2;  //80为向下 
            if (key == 75 && dir != 4)dir = 3;  //75为向左 
            if (key == 77 && dir != 3)dir = 4;  //77为向右 
        }
        if (key == 32)
        {
            while (1) if ((key = _getch()) == 32) break;
        }  //32为空格键，这儿用来暂停 
    }
    if (Flag == 0)   //如果没吃食物，才执行下面操作擦掉蛇尾 
    {
        gtxy(snk.x[snk.len - 1], snk.y[snk.len - 1]);  printf("  ");
    }
    int i;
    for (i = snk.len - 1; i > 0; i--)  //从蛇尾起每节存储前一节坐标值（蛇头除外） 
    {
        snk.x[i] = snk.x[i - 1];  snk.y[i] = snk.y[i - 1];
    }
    switch (dir)  //判断蛇头该往哪个方向移动，并获取最新坐标值 
    {
    case 1: snk.y[0]--; break;   //dir=1要向上移动 
    case 2: snk.y[0]++; break;  //dir=2要向下移动 
    case 3: snk.x[0] -= 2; break;  //dir=3要向左移动 
    case 4: snk.x[0] += 2; break;  //dir=4要向右移动 
    }
    Color(9);
    gtxy(snk.x[0], snk.y[0]); printf("■");   //打印蛇头 
    if (snk.x[0] == fod.x && snk.y[0] == fod.y)   //如吃到食物则执行以下操作 
    {
        printf("\7"); snk.len++; score += 100; snk.speed -= 5; Flag = 1;
    } //7是响铃 
    else Flag = 0;   //没吃到食物flag的值为0 
    if (snk.speed < 150) snk.speed = snk.speed + 5;   //作弊码，不让速度无限加快 
}
void putFod()  //投放食物 
{
    if (Flag == 1)  //如吃到食物才执行以下操作，生成另一个食物 
    {
        while (1)
        {
            int i, n = 1;
            srand((unsigned)time(NULL));  //初始化随机数发生器srand( )
            fod.x = rand() % (W - 4) + 2;  //产生在游戏框范围内的一个x坐标值 
            fod.y = rand() % (H - 2) + 1;  //产生在游戏框范围内的一个y坐标值 
            for (i = 0; i < snk.len; i++)   //随机生成的食物不能在蛇的身上 
            {
                if (fod.x == snk.x[i] && fod.y == snk.y[i]) { n = 0; break; }
            }
            if (n && fod.x % 2 == 0) break;  //n不能为0且横坐标为偶数，则食物坐标取值成功 
        }
        Color(12);  //设定字符为红色 
        gtxy(fod.x, fod.y);  printf("●");   //光标到取得的坐标处打印食物 
    }
    return;
}
int Over()  //判断游戏是否结束的函数 
{
    int  i;
    Color(7);
    gtxy(2, H + 1); printf("暂停键space.");  //以下打印一些其他信息 
    gtxy(2, H + 2); printf("游戏得分；%d", score);
    if (snk.x[0] == 0 || snk.x[0] == W) return 1;  //蛇头触碰左右边界 
    if (snk.y[0] == 0 || snk.y[0] == H) return 1;  //蛇头触碰上下边界 
    for (i = 1; i < snk.len; i++)
    {
        if (snk.x[0] == snk.x[i] && snk.y[0] == snk.y[i]) return 1;
    }  //蛇头触碰自身 
    return 0;    //没碰边界及自身就返回0 
}
void Color(int a)   //设定颜色的函数 
{
    SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), a);
}