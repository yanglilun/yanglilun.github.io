package com.garen.Denglu;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.ArrayList;

public class InitCfg {
	public static void main(String[] args) throws FileNotFoundException, IOException {
		ArrayList<User> list = new ArrayList<User>();
		String path = InitCfg.class.getClassLoader().getResource("users.cfg").getPath();
		System.out.println(path);
		ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(path));
		oos.writeObject(list);
	}

}
