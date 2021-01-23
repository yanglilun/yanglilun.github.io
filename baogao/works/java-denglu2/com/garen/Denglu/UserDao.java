package com.garen.Denglu;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.URL;
import java.util.ArrayList;

public class UserDao {
	
//	获取所有用户
	public ArrayList<User> getAllUser() throws IOException, ClassNotFoundException {
		URL resource = this.getClass().getClassLoader().getResource("users.cfg");
		ObjectInputStream ois = new ObjectInputStream(new FileInputStream(resource.getPath()));
		ArrayList<User> allusers = (ArrayList<User>) ois.readObject();
		ois.close();
		return allusers;
	}
//	保存用户信息
	public boolean saveUser(ArrayList<User> list) throws FileNotFoundException, IOException {
		String path = this.getClass().getClassLoader().getResource("users.cfg").getPath();
		ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(path));
		oos.writeObject(list);
		return true;
	}
//	追加用户信息
	public boolean addUser(User user) throws IOException, ClassNotFoundException {
		ArrayList<User> allUser = getAllUser();
		allUser.add(user);
		return saveUser(allUser);
	}
//	根据用户名获取用户
	public User getUserByUsername(String username) throws ClassNotFoundException, IOException {
		ArrayList<User> allUser = getAllUser();
		for(User u : allUser){
			if(u.username.equals(username)){
				return u;
			}
		}
		return null;
		
	}
	
	public static void main(String[] args) throws ClassNotFoundException, IOException {
		UserDao userDao = new UserDao();
		ArrayList<User> allUser = userDao.getAllUser();
		System.out.println(allUser);
	}
}
