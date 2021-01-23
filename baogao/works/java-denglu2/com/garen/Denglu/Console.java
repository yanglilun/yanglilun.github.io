package com.garen.Denglu;

import java.io.IOException;
import java.util.Objects;
import java.util.Scanner;

public class Console {
	
	private Scanner scanner = new Scanner(System.in);
	private UserDao userDao = new UserDao();
	
//	�˵�
	public void menu() {
		System.out.println("-----��¼ע��ϵͳ-----");
		System.out.println("1.��¼\n2.ע��\n3.�˳�");
	}
//	��½����
	public void login() throws ClassNotFoundException, IOException {
		System.out.println("��¼����:");
		System.out.println("�������û���");
		String username = readLine();
		System.out.println("����������");
		String password = readLine();
		User user = userDao.getUserByUsername(username);
		if(Objects.isNull(user)){
			System.out.println("û�д��û���");
			return;
		}else{
			if(user.password.equals(password)){
				System.out.println("��½�ɹ�!!!!\n\n�������������");
				readLine();
			}else{
				System.out.println("��½ʧ�ܣ��������");
			}
		}
		
	}
//	ע�����
	public void register() throws ClassNotFoundException, IOException {
		System.out.println("ע�����:");
		System.out.println("������ע����û���");
		String username = readLine();
		User userByUsername = userDao.getUserByUsername(username);
		if(Objects.nonNull(userByUsername)){
			System.out.println("�û����Ѵ��ڣ�");
			return;
		}else{
			System.out.println("����������");
			String password = readLine();
			boolean f = userDao.addUser(new User(username, password));
			if(f){
				System.out.println("ע��ɹ�!\n\n");
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
