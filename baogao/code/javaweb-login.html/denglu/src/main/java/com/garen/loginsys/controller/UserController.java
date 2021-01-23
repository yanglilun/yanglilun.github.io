package com.garen.loginsys.controller;

import com.garen.loginsys.entity.User;
import com.garen.loginsys.mapper.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller
public class UserController {

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private UserDao userDao;

    @RequestMapping("getAllUser")
    @ResponseBody
    public ArrayList<User> getAllUser(){
        return (ArrayList<User>) userDao.queryAll(new User());
    }


    @RequestMapping("login")
    @ResponseBody
    public boolean login(String username,String password,HttpServletRequest req){
        List<User> users = userDao.queryAll(new User(null, username, null, null, 0));
        if(users.size()!=0){
            if(users.get(0).getUpassword().equals(password)){
                req.getSession().setAttribute("now",users.get(0));
                return true;
            }else{
                return false;
            }

        }else{
           return false;
        }
    }

    @RequestMapping("getUserByUsername")
    @ResponseBody
    public User getUserByUsername(String username){
        User user = new User();
        user.setUsername(username);
        List<User> users = userDao.queryAll(user);
        if(users.size() == 0){
            return null;
        }else{
            return users.get(0);
        }
    }

    @RequestMapping("insertUser")
    @ResponseBody
    public boolean insertUser(User user){
        return userDao.insert(user) > 0;
    }

    @RequestMapping("deleteByUid")
    @ResponseBody
    public boolean deleteByUid(int uid){
        return userDao.deleteById(uid) > 0;
    }

    @RequestMapping("getLoging")
    @ResponseBody
    public User getLoging(HttpServletRequest request){
        HttpSession session = request.getSession();
        User now = (User) session.getAttribute("now");
        return now;
    }

}
