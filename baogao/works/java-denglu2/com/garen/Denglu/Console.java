package com.garen.Denglu;

import java.io.IOException;
import java.util.Objects;
import java.util.Scanner;

public class Console {
	
	private Scanner scanner = new Scanner(System.in);
	private UserDao userDao = new UserDao();
	
//	菜单
	public void menu() {
		System.out.println("-----登录注册系统-----");
		System.out.println("1.登录\n2.注册\n3.退出");
	}
//	登陆操作
	public void login() throws ClassNotFoundException, IOException {
		System.out.println("登录操作:");
		System.out.println("请输入用户名");
		String username = readLine();
		System.out.println("请输入密码");
		String password = readLine();
		User user = userDao.getUserByUsername(username);
		if(Objects.isNull(user)){
			System.out.println("没有此用户！");
			return;
		}else{
			if(user.password.equals(password)){
				System.out.println("登陆成功!!!!\n\n输入任意键继续");
				readLine();
			}else{
				System.out.println("登陆失败，密码错误");
			}
		}
		
	}
//	注册操作
	public void register() throws ClassNotFoundException, IOException {
		System.out.println("注册操作:");
		System.out.println("请输入注册的用户名");
		String username = readLine();
		User userByUsername = userDao.getUserByUsername(username);
		if(Objects.nonNull(userByUsername)){
			System.out.println("用户名已存在！");
			return;
		}else{
			System.out.println("请输入密码");
			String password = readLine();
			boolean f = userDao.addUser(new User(username, password));
			if(f){
				System.out.println("注册成功!\n\n");
			}
		}
	}
	
	public String readLine() {
		return this.scanner.nextLine();
	}
	
	public static void main(String[] args) throws ClassNotFoundException, IOException {
		Console console = new Console();
		while(true){
			console.menu();
			switch (console.readLine()) {
			case "1":
				console.login();
				break;
			case "2":
				console.register();
				break;
			case "3":
				return;
			}
		}
	}
	

}
