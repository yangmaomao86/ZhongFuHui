using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace HuiSu.Models
{
    public class SqlHelper
    {
        #region 初始化参数 public SqlConnection myConn 

        public SqlConnection myConn = null;

        #endregion

        #region 构造函数 SqlHelperXhf()

        public SqlHelper()
        {
            myConn = new SqlConnection(ConfigurationManager.AppSettings["ConStr"].ToString().Trim());
        }

        #endregion

        #region 重载连接字符串 +SqlHelperXhf(string WebConfigConnectionStringsName)


        #endregion

        #region 析构 ~SqlHelperXhf()

        ~SqlHelper()
        {
            myConn.Close();
            myConn.Dispose();
        }

        #endregion

        #region 返回SqlDataAdapter + SqlDataAdapter Getsda(string str)

        /// <summary>
        /// 返回sda
        /// </summary>
        /// <param name="str">sql语句</param>
        /// <returns>SqlDataAdapter</returns>
        public SqlDataAdapter Getsda(string str)
        {
            return new SqlDataAdapter(str, myConn);
        }

        #endregion

        #region 返回第一行的第一列的数据 +object ExecuteScalar(string sql)

        /// <summary>
        /// 返回第一行的第一列
        /// </summary>
        /// <param name="sql">需要查询的SQL语句</param>
        /// <returns>返回Object类型的数据</returns>
        public object ExecuteScalar(string sql)
        {
            SqlCommand sqlCommand = new SqlCommand(sql, this.myConn);
            try
            {
                if (myConn.State == ConnectionState.Closed) myConn.Open();
                object reObj = sqlCommand.ExecuteScalar();
                myConn.Close();
                return reObj;
            }
            catch (Exception ex)
            {
                myConn.Close();
                throw new Exception(ex + "<\r\n>" + sql);
            }
        }

        #endregion

        #region 返回第一行第一列的数据 +object ExecuteScalar(string sql, params SqlParameter[] sqlParames)

        /// <summary>
        /// 返回第一行第一列的数据
        /// </summary>
        /// <param name="sql">需要查询的SQL语句</param>
        /// <param name="sqlParames">SQL语句中的参数</param>
        /// <returns>object类型的数据</returns>
        public object ExecuteScalar(string sql, params SqlParameter[] sqlParames)
        {
            SqlCommand sqlCommand = new SqlCommand(sql, this.myConn);

            try
            {
                if (myConn.State == ConnectionState.Closed) myConn.Open();
                sqlCommand.Parameters.Clear();
                sqlCommand.Parameters.AddRange(sqlParames);
                object reObj = sqlCommand.ExecuteScalar();
                myConn.Close();
                return reObj;
            }
            catch (Exception ex)
            {
                myConn.Close();
                throw new Exception(ex + "<\r\n>" + sql);
            }
        }

        #endregion

        #region 返回数量 +int Count(string sql)

        public int Count(string sql)
        {
            return Convert.ToInt32(ExecuteScalar(sql));
        }

        #endregion

        #region 返回数量 +int Count(string sql, params SqlParameter[] sqlParames)

        public int Count(string sql, params SqlParameter[] sqlParames)
        {
            return Convert.ToInt32(ExecuteScalar(sql, sqlParames));
        }

        #endregion

        #region 执行SQL语句。返回受影响行数 +int ExecuteNonQuery(string sql)

        public int ExecuteNonQuery(string sql)
        {
            SqlCommand sqlCommand = new SqlCommand(sql, this.myConn);
            try
            {
                if (myConn.State == ConnectionState.Closed) myConn.Open();
                int reInt = sqlCommand.ExecuteNonQuery();
                myConn.Close();
                return reInt;
            }
            catch (Exception ex)
            {
                myConn.Close();
                throw new Exception(ex + "<\r\n>" + sql);
            }
        }

        #endregion

        #region 执行SQL语句。返回 DataSet +DataSet ExecuteDataSet(string sql)

        public DataSet ExecuteDataSet(string sql)
        {
            SqlCommand sqlCommand = new SqlCommand(sql, this.myConn);
            DataSet retrunDataSet = new DataSet();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlCommand);
            try
            {
                sqlDataAdapter.Fill(retrunDataSet);
                return retrunDataSet;
            }
            catch (Exception ex)
            {
                throw new Exception(ex + "<\r\n>" + sql);
            }
        }

        #endregion

        #region 执行SQL语句。返回 DataTable +DataTable ExecuteDataTable(string sql)

        public DataTable ExecuteDataTable(string sql)
        {
            SqlCommand sqlCommand = new SqlCommand(sql, this.myConn);
            DataTable retrunDataTable = new DataTable();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlCommand);
            try
            {
                sqlDataAdapter.Fill(retrunDataTable);
                return retrunDataTable;
            }
            catch (Exception ex)
            {
                throw new Exception(ex + "<\r\n>" + sql);
            }
        }

        #endregion

        #region 执行带参数的SQL语句。返回受影响行数 +int ExecuteNonQuery(string sql， params SqlParameter []sqlParames)

        public int ExecuteNonQuery(string sql, params SqlParameter[] sqlParames)
        {
            SqlCommand sqlCommand = new SqlCommand(sql, this.myConn);
            if (sqlParames.Length > 0)
            {
                sqlCommand.Parameters.Clear();
                sqlCommand.Parameters.AddRange(sqlParames);
            }
            try
            {
                if (myConn.State == ConnectionState.Closed)
                {
                    myConn.Open();
                }
                int reInt = sqlCommand.ExecuteNonQuery();
                myConn.Close();
                return reInt;
            }
            catch (Exception ex)
            {
                myConn.Close();
                throw new Exception(ex + "<\r\n>" + sql);
            }
        }

        #endregion

        #region 执行带参数的sql + DataSet ExecuteDataSet(string sql, params SqlParameter[] sqlParames)

        /// <summary>
        /// 执行带参数的sql
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="sqlParames"></param>
        /// <returns></returns>
        public DataSet ExecuteDataSet(string sql, params SqlParameter[] sqlParames)
        {
            SqlCommand cmd = new SqlCommand(sql, myConn);
            if (sqlParames.Length > 0)
            {
                cmd.Parameters.Clear();
                cmd.Parameters.AddRange(sqlParames);
            }
            DataSet ds = new DataSet();
            SqlDataAdapter sda = new SqlDataAdapter(cmd);
            try
            {
                sda.Fill(ds);
                return ds;
            }
            catch (Exception)
            {
                return ds;
            }

        }

        #endregion

        #region 执行带参数的sql + DataTable ExecuteDataTable(string sql, params SqlParameter[] sqlParames)

        /// <summary>
        /// 执行带参数的sql
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="sqlParames"></param>
        /// <returns></returns>
        public DataTable ExecuteDataTable(string sql, params SqlParameter[] sqlParames)
        {
            SqlCommand cmd = new SqlCommand(sql, myConn);
            if (sqlParames.Length > 0)
            {
                cmd.Parameters.Clear();
                cmd.Parameters.AddRange(sqlParames);
            }
            DataTable dt = new DataTable();
            SqlDataAdapter sda = new SqlDataAdapter(cmd);
            try
            {
                sda.Fill(dt);
                return dt;
            }
            catch (Exception)
            {
                return dt;
            }

        }

        #endregion







    }
}