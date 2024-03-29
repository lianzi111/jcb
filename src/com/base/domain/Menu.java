package com.base.domain;

import com.base.util.FDate;
import java.util.Date;

public class Menu {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_menu.ID
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    private Integer id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_menu.ParentID
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    private Integer parentid;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_menu.menuLevel
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    private Integer menulevel;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_menu.menuname
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    private String menuname;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_menu.menupage
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    private String menupage;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_menu.childnum
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    private Integer childnum;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_menu.menudes
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    private String menudes;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_menu.menutype
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    private String menutype;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_menu.menuorder
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    private Integer menuorder;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_menu.state
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    private String state;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_menu.Operator
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    private String operator;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_menu.createdate
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    private Date createdate;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column t_menu.createtime
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    private String createtime;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_menu.ID
     *
     * @return the value of t_menu.ID
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_menu.ID
     *
     * @param id the value for t_menu.ID
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_menu.ParentID
     *
     * @return the value of t_menu.ParentID
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public Integer getParentid() {
        return parentid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_menu.ParentID
     *
     * @param parentid the value for t_menu.ParentID
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public void setParentid(Integer parentid) {
        this.parentid = parentid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_menu.menuLevel
     *
     * @return the value of t_menu.menuLevel
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public Integer getMenulevel() {
        return menulevel;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_menu.menuLevel
     *
     * @param menulevel the value for t_menu.menuLevel
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public void setMenulevel(Integer menulevel) {
        this.menulevel = menulevel;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_menu.menuname
     *
     * @return the value of t_menu.menuname
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public String getMenuname() {
        return menuname;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_menu.menuname
     *
     * @param menuname the value for t_menu.menuname
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public void setMenuname(String menuname) {
        this.menuname = menuname;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_menu.menupage
     *
     * @return the value of t_menu.menupage
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public String getMenupage() {
        return menupage;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_menu.menupage
     *
     * @param menupage the value for t_menu.menupage
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public void setMenupage(String menupage) {
        this.menupage = menupage;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_menu.childnum
     *
     * @return the value of t_menu.childnum
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public Integer getChildnum() {
        return childnum;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_menu.childnum
     *
     * @param childnum the value for t_menu.childnum
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public void setChildnum(Integer childnum) {
        this.childnum = childnum;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_menu.menudes
     *
     * @return the value of t_menu.menudes
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public String getMenudes() {
        return menudes;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_menu.menudes
     *
     * @param menudes the value for t_menu.menudes
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public void setMenudes(String menudes) {
        this.menudes = menudes;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_menu.menutype
     *
     * @return the value of t_menu.menutype
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public String getMenutype() {
        return menutype;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_menu.menutype
     *
     * @param menutype the value for t_menu.menutype
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public void setMenutype(String menutype) {
        this.menutype = menutype;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_menu.menuorder
     *
     * @return the value of t_menu.menuorder
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public Integer getMenuorder() {
        return menuorder;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_menu.menuorder
     *
     * @param menuorder the value for t_menu.menuorder
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public void setMenuorder(Integer menuorder) {
        this.menuorder = menuorder;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_menu.state
     *
     * @return the value of t_menu.state
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public String getState() {
        return state;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_menu.state
     *
     * @param state the value for t_menu.state
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public void setState(String state) {
        this.state = state;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_menu.Operator
     *
     * @return the value of t_menu.Operator
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public String getOperator() {
        return operator;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_menu.Operator
     *
     * @param operator the value for t_menu.Operator
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public void setOperator(String operator) {
        this.operator = operator;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_menu.createdate
     *
     * @return the value of t_menu.createdate
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public Date getCreatedate() {
        return createdate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_menu.createdate
     *
     * @param createdate the value for t_menu.createdate
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public void setCreatedate(String createdate) {
        this.createdate = FDate.getDate(createdate);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_menu.createdate
     *
     * @param createdate the value for t_menu.createdate
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public void setCreatedate(Date createdate) {
        this.createdate = createdate;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column t_menu.createtime
     *
     * @return the value of t_menu.createtime
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public String getCreatetime() {
        return createtime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column t_menu.createtime
     *
     * @param createtime the value for t_menu.createtime
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    public void setCreatetime(String createtime) {
        this.createtime = createtime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table t_menu
     *
     * @mbggenerated Sun Oct 18 20:19:01 CST 2015
     */
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", parentid=").append(parentid);
        sb.append(", menulevel=").append(menulevel);
        sb.append(", menuname=").append(menuname);
        sb.append(", menupage=").append(menupage);
        sb.append(", childnum=").append(childnum);
        sb.append(", menudes=").append(menudes);
        sb.append(", menutype=").append(menutype);
        sb.append(", menuorder=").append(menuorder);
        sb.append(", state=").append(state);
        sb.append(", operator=").append(operator);
        sb.append(", createdate=").append(createdate);
        sb.append(", createtime=").append(createtime);
        sb.append("]");
        return sb.toString();
    }
}