/**
 * �๦������:{}
 * date:Dec 9, 2013 2:17:26 PM
 * author:wubangjun
 * version:1.0
 */
package com.base.page;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.base.util.SysConstant;

/**
 * @author wubangjun
 * 
 */
public class Page {
	// ��ҳ��ѯ��ʼ��¼λ��
	private int begin;
	// ��ҳ�鿴�½���λ��
	private int end;
	// ÿҳ��ʾ��¼��
	private int pageSize = SysConstant.Paging.PAGE_SIZE;
	// ��ѯ����ܼ�¼��
	private int recordCount;
	// ��ǰҳ��
	private int currentPage;
	// �ܹ�ҳ��
	private int totalPage;

	public Page() {

	}

	public Page(int begin, int pageSize) {
		this.begin = begin;
		this.pageSize = pageSize;
		this.end = this.begin + this.pageSize;
		this.currentPage = (int) Math
				.floor((this.begin * 1.0d) / this.pageSize) + 1;
	}

	public Page(int begin, int length, int count) {
		this(begin, length);
		this.recordCount = count;
	}

	public int getBegin() {
		return begin;
	}

	public void setBegin(int begin) {
		this.begin = begin;
	}

	public int getEnd() {
		return end;
	}

	public void setEnd(int end) {
		this.end = end;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getRecordCount() {
		return recordCount;
	}

	public void setRecordCount(int recordCount) {
		this.recordCount = recordCount;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("recordCount", this.recordCount).append("pageSize",
						this.pageSize).append("begin", this.begin).append(
						"totalPage", this.totalPage).append("currentPage",
						this.currentPage).append("end", this.end).toString();
	}

	public void calPageBeginAndEndByRecored() {
		this.totalPage = (this.recordCount / SysConstant.Paging.PAGE_SIZE)
				+ ((this.recordCount % SysConstant.Paging.PAGE_SIZE) == 0 ? 0
						: 1);
		this.begin = (this.currentPage - 1) * SysConstant.Paging.PAGE_SIZE;
		this.end = SysConstant.Paging.PAGE_SIZE;
	}

	// public int getBegin() {
	// return begin;
	// }
	//  
	// public int getEnd() {
	// return end;
	// }
	//  
	// public void setEnd(int end) {
	// this.end = end;
	// }
	//  
	// public void setBegin(int begin) {
	// this.begin = begin;
	// if (this.pageSize != 0) {
	// this.currentPage = (int) Math.floor((this.begin * 1.0d) / this.pageSize)
	// + 1;
	// }
	// }
	//  
	// public void setPageSize(int pageSize) {
	// this.pageSize = pageSize;
	// if (this.begin != 0) {
	// this.currentPage = (int) Math.floor((this.begin * 1.0d) / this.pageSize)
	// + 1;
	// }
	// }
	//  
	// public void setRecordCount(int recordCount) {
	// this.recordCount = recordCount;
	// this.totalPage = (int) Math.floor((this.recordCount * 1.0d) /
	// this.pageSize);
	// if (this.recordCount % this.pageSize != 0) {
	// this.totalPage++;
	// }
	// }
	//  
	// public int getTotalPage() {
	// if (totalPage == 0) {
	// return 1;
	// }
	// return totalPage;
	// }
	//
	// public int getCurrentPage() {
	// return currentPage;
	// }
	//
	// public void setCurrentPage(int currentPage) {
	// this.currentPage = currentPage;
	// }
	//
	// public int getPageSize() {
	// return pageSize;
	// }
	//
	// public int getRecordCount() {
	// return recordCount;
	// }
	//
	// public void setTotalPage(int totalPage) {
	// this.totalPage = totalPage;
	// }

}
