/*--------------------------------------
project： 双人小游戏
anthor：   LLz
操作    移动    逆、顺时针旋转   发射子弹
玩家1   4568    7 9 			      0
玩家2   adws 	  q e 			      空格
--------------------------------*/
#include <stdio.h>
#include <stdlib.h>
#include <conio.h>
#include <windows.h>
#define High 20  // 游戏画面尺寸
#define Width 100        
// 全局变量
int position_x, position_y, p_x, p_y, turn_a, turn_b, num_a, num_b, num_max, life_a = 10, life_b = 10; // 飞机位置
int canvas[High][Width] = { 0 }; // 二维数组存储游戏画布中对应的元素
// 0为空格，1为飞机*，2为子弹|，3为敌机@
int next[8][2] = { {0,1},{1,1},{1,0},{1,-1},{0,-1},{-1,-1},{-1,0},{-1,1} }; //从右  右下  下  左下 
int bullet_a[21][4];
int bullet_b[21][4];   //a b玩家子弹20发；            
void gotoxy(int x, int y)  //光标移动到(x,y)位置
{
	HANDLE handle = GetStdHandle(STD_OUTPUT_HANDLE);
	COORD pos;
	pos.X = x;
	pos.Y = y;
	SetConsoleCursorPosition(handle, pos);
}
void startup() // 数据初始化
{
	num_a = 0;
	num_b = 0;
	turn_a = 0;
	turn_b = 0;
	p_x = High / 2;
	p_y = Width * 4 / 5;
	canvas[p_x][p_y] = 5;
	position_x = High / 2;
	position_y = Width / 5;
	canvas[position_x][position_y] = 1;
}
void show()  // 显示画面
{
	gotoxy(0, 0);  // 光标移动到原点位置，以下重画清屏
	int i, j;
	for (i = 0; i < High; i++)
	{
		for (j = 0; j < Width; j++)
		{
			if (i == 0 || i == High - 1 || j == 0 || j == Width - 1) {
				canvas[i][j] = 4;
				printf("0");
				continue;
			}
			if (canvas[i][j] == 0)
				printf(" ");   //   输出空格
			else if (canvas[i][j] == 1)
				printf("N");   //   输出飞机a
			else if (canvas[i][j] == 2)
				printf("@");   //   输出飞机B
			else if (canvas[i][j] == 3)
				printf("o");   //  输出子弹o 
			else if (canvas[i][j] == 4)
				printf("o");   //	输出飞机a指向 
			else if (canvas[i][j] == 5)
				printf("o");   //	输出飞机b指向  
		}
		printf("\n");
	}
	printf("A：");
	for (i = 1; i <= 10; i++)
		if (i <= life_a)
			printf("■");
		else printf(" ");
	printf("\nB: ");
	for (i = 1; i <= 10; i++)
		if (i <= life_b)
			printf("■");
		else printf(" ");
}
void updateWithoutInput()  // 与用户输入无关的更新
{
	int i, j, k;
	num_max = num_a > num_b ? num_a : num_b;
	for (i = 1; i <= num_max; i++) {
		if (bullet_a[i][2] == 0 || bullet_a[i][2] == High - 1) {
			bullet_a[i][0] = -bullet_a[i][0];
		}
		else if (bullet_a[i][3] == 0 || bullet_a[i][3] == Width - 1) {
			bullet_a[i][1] = -bullet_a[i][1];
		}
		if (bullet_b[i][2] == 0 || bullet_b[i][2] == High - 1) {
			bullet_b[i][0] = -bullet_b[i][0];
		}
		else if (bullet_b[i][3] == 0 || bullet_b[i][3] == Width - 1) {
			bullet_b[i][1] = -bullet_b[i][1];
		}
		canvas[bullet_a[i][2]][bullet_a[i][3]] = 0;
		canvas[bullet_b[i][2]][bullet_b[i][3]] = 0;
		bullet_a[i][2] += bullet_a[i][0];
		bullet_a[i][3] += bullet_a[i][1];
		bullet_b[i][2] += bullet_b[i][0];
		bullet_b[i][3] += bullet_b[i][1];
		canvas[bullet_a[i][2]][bullet_a[i][3]] = 3;
		canvas[bullet_b[i][2]][bullet_b[i][3]] = 3;
	}
	for (k = 1; k <= num_max; k++)
	{
		if (((position_x == bullet_a[k][2]) && (position_y == bullet_a[k][3])) || ((position_x == bullet_b[k][2]) && (position_y == bullet_b[k][3])))  // 敌机撞到我机
		{
			life_a--;
			if (life_a <= 0) {
				printf("A 玩家失败！\n");
				Sleep(3000);
				system("pause");
				exit(0);
			}
		}
		if (((p_x == bullet_a[k][2]) && (p_y == bullet_a[k][3])) || ((p_x == bullet_b[k][2]) && (p_y == bullet_b[k][3])))  // 敌机撞到我机
		{
			life_b--;
			if (life_b <= 0) {
				printf("B 玩家失败！\n");
				Sleep(3000);
				system("pause");
				exit(0);
			}
		}
	}
}
void updateWithInput()  // 与用户输入有关的更新
{
	char input;
	if (_kbhit())  // 判断是否有输入
	{
		input = _getch();  // 根据用户的不同输入来移动，不必输入回车
		if (input == 'a' && position_y > 1)
		{
			canvas[position_x + next[turn_a][0]][position_y + next[turn_a][1]] = 0;
			canvas[position_x][position_y] = 0;
			position_y--;  // 位置左移
			canvas[position_x][position_y] = 1;
			canvas[position_x + next[turn_a][0]][position_y + next[turn_a][1]] = 4;
		}
		else if (input == 'd' && position_y < Width - 2)
		{
			canvas[position_x + next[turn_a][0]][position_y + next[turn_a][1]] = 0;
			canvas[position_x][position_y] = 0;
			position_y++;  // 位置右移
			canvas[position_x][position_y] = 1;
			canvas[position_x + next[turn_a][0]][position_y + next[turn_a][1]] = 4;
		}
		else if (input == 'w' && position_x > 1)
		{
			canvas[position_x + next[turn_a][0]][position_y + next[turn_a][1]] = 0;
			canvas[position_x][position_y] = 0;
			position_x--;  // 位置上移
			canvas[position_x][position_y] = 1;
			canvas[position_x + next[turn_a][0]][position_y + next[turn_a][1]] = 4;
		}
		else if (input == 's' && position_x < High - 2)
		{
			canvas[position_x + next[turn_a][0]][position_y + next[turn_a][1]] = 0;
			canvas[position_x][position_y] = 0;
			position_x++;  // 位置下移
			canvas[position_x][position_y] = 1;
			canvas[position_x + next[turn_a][0]][position_y + next[turn_a][1]] = 4;
		}
		else if (input == ' ' && num_a <= 20)  // 发射子弹
		{
			num_a++;
			bullet_a[num_a][0] = next[turn_a][0];
			bullet_a[num_a][1] = next[turn_a][1];
			bullet_a[num_a][2] = position_x + bullet_a[num_a][0];
			bullet_a[num_a][3] = position_y + bullet_a[num_a][1];
			canvas[bullet_a[num_a][2]][bullet_a[num_a][3]] = 3;
		}
		else if (input == 'q')  // 炮弹换方向 
		{
			canvas[position_x + next[turn_a][0]][position_y + next[turn_a][1]] = 0;
			turn_a--;
			if (turn_a < 0)
				turn_a = 7;
			canvas[position_x + next[turn_a][0]][position_y + next[turn_a][1]] = 4;
		}
		else if (input == 'e')  //  炮弹换方向 
		{
			canvas[position_x + next[turn_a][0]][position_y + next[turn_a][1]] = 0;
			turn_a++;
			if (turn_a > 7)
				turn_a = 0;
			canvas[position_x + next[turn_a][0]][position_y + next[turn_a][1]] = 4;
		}
		else if (input == '4' && position_y > 1)
		{
			canvas[p_x + next[turn_b][0]][p_y + next[turn_b][1]] = 0;
			canvas[p_x][p_y] = 0;
			p_y--;  // 位置左移
			canvas[p_x][p_y] = 2;
			canvas[p_x + next[turn_b][0]][p_y + next[turn_b][1]] = 5;
		}
		else if (input == '6' && p_y < Width - 2)
		{
			canvas[p_x + next[turn_b][0]][p_y + next[turn_b][1]] = 0;
			canvas[p_x][p_y] = 0;
			p_y++;  // 位置右移
			canvas[p_x][p_y] = 2;
			canvas[p_x + next[turn_b][0]][p_y + next[turn_b][1]] = 5;
		}
		else if (input == '8' && p_x > 1)
		{
			canvas[p_x + next[turn_b][0]][p_y + next[turn_b][1]] = 0;
			canvas[p_x][p_y] = 0;
			p_x--;  // 位置上移
			canvas[p_x][p_y] = 2;
			canvas[p_x + next[turn_b][0]][p_y + next[turn_b][1]] = 5;
		}
		else if (input == '5' && p_x < High - 2)
		{
			canvas[p_x + next[turn_b][0]][p_y + next[turn_b][1]] = 0;
			canvas[p_x][p_y] = 0;
			p_x++;  // 位置下移
			canvas[p_x][p_y] = 2;
			canvas[p_x + next[turn_b][0]][p_y + next[turn_b][1]] = 5;
		}
		else if (input == '0' && num_b <= 20)  // 发射子弹
		{
			num_b++;
			bullet_b[num_b][0] = next[turn_b][0];
			bullet_b[num_b][1] = next[turn_b][1];
			bullet_b[num_b][2] = p_x + bullet_b[num_b][0];
			bullet_b[num_b][3] = p_y + bullet_b[num_b][1];
			canvas[bullet_b[num_b][2]][bullet_b[num_b][3]] = 3;
		}
		else if (input == '7')  // 炮弹换方向 
		{
			canvas[p_x + next[turn_b][0]][p_y + next[turn_b][1]] = 0;
			turn_b--;
			if (turn_b < 0)
				turn_b = 7;
			canvas[p_x + next[turn_b][0]][p_y + next[turn_b][1]] = 5;
		}
		else if (input == '9')  //  炮弹换方向 
		{
			canvas[p_x + next[turn_b][0]][p_y + next[turn_b][1]] = 0;
			turn_b++;
			if (turn_b > 7)
				turn_b = 0;
			canvas[p_x + next[turn_b][0]][p_y + next[turn_b][1]] = 5;
		}
	}
}
int main()
{
	startup();  // 数据初始化
	system("color 30");
	while (1)  // 游戏循环执行
	{
		show();  // 显示画面
		updateWithoutInput();  // 与用户输入无关的更新
		updateWithInput();  // 与用户输入有关的更新
	}
	return 0;
}
