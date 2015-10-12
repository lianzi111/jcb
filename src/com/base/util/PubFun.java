/**
 * :{}
 * date:Dec 2, 2013 2:36:52 PM
 * author:wubangjun
 * version:1.0
 */
package com.base.util;

import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import com.base.domain.DataDic;
import com.base.domain.DataDicSchema;
import com.base.mapper.DataDicMapper;

/**
 * @author wubangjun
 * 
 */
public class PubFun {
	// 16进制表示
	private static char HEXDIGITS[] = { '0', '1', '2', '3', '4', '5', '6', '7',
			'8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };
	
	private static SqlSessionFactory sqlSessionFactory = null;

	public static Map<String, String> getSelectData(String codetype) {
		DataDicMapper mapper = (DataDicMapper)getBean(DataDicMapper.class);
		DataDicSchema schema = new DataDicSchema();
		schema.createCriteria().andCodetypeEqualTo(codetype);
		schema.setOrderByClause(" code asc");
		List<DataDic> list = mapper.selectByExample(schema);
		Map<String, String> map = new TreeMap<String, String>();
		map.put("", "请选择...");
		for (DataDic d : list) {
			System.out.println(d);
			map.put(d.getCode(), d.getName());
		}
		return map;
	}

	public static String getSelectData(String codetype, String condition) {
		return getSelectData(codetype, condition,null);
	}
	
	public static String getSelectData(String codetype, String condition,String checkValue) {
		sqlSessionFactory = (SqlSessionFactory) SpringBeanFactoryUtils
				.getBean("sqlSessionFactory");
		SqlSession session = sqlSessionFactory.openSession();
		DataDicMapper mapper = session.getMapper(DataDicMapper.class);
		DataDicSchema schema = new DataDicSchema();
		schema.createCriteria().andCodetypeEqualTo(codetype);
		schema.setOrderByClause(" code asc");
		List<DataDic> list = mapper.selectByExample(schema);
		StringBuffer option = new StringBuffer("<option value=''>请选择...</option>");
		for (DataDic d : list) {
			if(checkValue!=null&&d.getCode().equals(checkValue)){
				option.append("<option value='" + d.getCode() + "' selected='selected'>"+ d.getName() + "</option>");
			}else{
				option.append("<option value='" + d.getCode() + "' >"+ d.getName() + "</option>");
			}
		}
		session.close();
		return option.toString();
	}	
	
	public static String getCodeByCodeName(String codetype, String codeName){
		DataDicMapper mapper = (DataDicMapper)getBean(DataDicMapper.class);
		DataDicSchema schema = new DataDicSchema();
		schema.createCriteria().andCodetypeEqualTo(codetype).andNameEqualTo(codeName);
		List<DataDic> list = mapper.selectByExample(schema);
		if(list!=null&&list.size()>0){
			return list.get(0).getCode();
		}else{
			return "";
		}
	}
	
	public static boolean isEmptyString(String str){
		if(str==null||"".equals(str.trim())){
			return true;
		}
		return false;
	}
	
	public static String getCurrentDate() {
		String pattern = "yyyy-MM-dd";
		SimpleDateFormat df = new SimpleDateFormat(pattern);
		Date today = new Date();
		String tString = df.format(today);
		return tString;
	}
	
	/**
	 * 得到当前系统时间 
	 * @return 当前时间的格式字符串，时间格式为"HH:mm:ss"
	 */
	public static String getCurrentTime() {
		String pattern = "HH:mm:ss";
		SimpleDateFormat df = new SimpleDateFormat(pattern);
		Date today = new Date();
		String tString = df.format(today);
		return tString;
	}
	
	public static String LCh(String sourString, String cChar, int cLen) {
		int tLen = sourString.length();
		int i, iMax;
		String tReturn = "";
		if (tLen >= cLen) {
			return sourString;
		}
		iMax = cLen - tLen;
		for (i = 0; i < iMax; i++) {
			tReturn += cChar;
		}
		tReturn = tReturn.trim() + sourString.trim();
		return tReturn;
	}
	
	public static Object getBean(String beanName){
		return SpringBeanFactoryUtils.getBean(beanName);
	}

	public static Object getBean(Class beanName){
		return SpringBeanFactoryUtils.getBean(beanName);
	}

	public static String firstToUpper(String str){
		char c = str.charAt(0);
		return Character.toUpperCase(c) + str.substring(1);
	}
	public static String subString(String localizedMessage, int len) {
		if(isEmptyString(localizedMessage)){
			return "";
		}
		if(localizedMessage.length()>len){
			return localizedMessage.substring(0, len);
		}else{
			return localizedMessage;
		}
	}	
	
    /**
     * 判断是否是GBK编码
     * @param tStr String
     * @return boolean
     */
    public static boolean isGBKString(String tStr)
    {
        int tlength = tStr.length();
        Integer t = new Integer(0);
        int t1 = 0;
        for (int i = 0; i < tlength; i++)
        {
            t1 = Integer.parseInt(Integer.toOctalString(tStr.charAt(i)));
            if (t1 > 511)
            {
                return true;
            }
        }
        return false;
    }	
    
	/**
	 * author：wubangjun
	 * @param source
	 * @return
	 * return_type：String
	 * date:2014年5月27日 上午11:05:56
	 * 方法描述：{MD加密}
	 */
	public static String mD5Encrypt(String source) {
		if(isEmptyString(source)){
			return null;
		}
		String afterMD5 = new String();
		try {
			byte[] strTemp = source.getBytes();
			MessageDigest mdTemp = MessageDigest.getInstance("MD5");
			mdTemp.update(strTemp);
			byte[] md = mdTemp.digest();
			int j = md.length;
			char str[] = new char[j * 2];
			int k = 0;
			for (int i = 0; i < j; i++) {
				byte byte0 = md[i];
				str[k++] = HEXDIGITS[byte0 >>> 4 & 0xf];
				str[k++] = HEXDIGITS[byte0 & 0xf];
			}
			afterMD5 = new String(str);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return afterMD5;
	}
}
