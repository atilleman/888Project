using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebAPIDemo.Models;

namespace WebAPIDemo.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EightController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage UpdateMyUser([FromBody]object param)
        {
            string Log = "";
            try
            {
                JObject jobj = JObject.FromObject(param);
                int UserID = jobj.Value<int>("ID");
                string FirstName = jobj.Value<string>("FirstName");
                string LastName = jobj.Value<string>("LastName");
                string UserName = jobj.Value<string>("UserName");
                DateTime DOB = Convert.ToDateTime(jobj.Value<string>("DOB"));

                bool IsSuccess = UpdateUser(UserID, FirstName, LastName, UserName, DOB);
                if (!IsSuccess)
                {
                    return Request.CreateResponse(HttpStatusCode.NoContent);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { IsSuccess });
                }
            }
            catch (Exception ex)
            {
                Log = ex.Message;
                return null;
            }
        }

        [HttpPost]
        public HttpResponseMessage GetMyUserDetails([FromBody]object param)
        {
            string Log = "";
            try
            {
                JObject jobj = JObject.FromObject(param);
                int UserID = jobj.Value<int>("ID");

                DataTable UserDetails = GetUserDetails(UserID);
                if (UserDetails.Rows.Count == 0)
                {
                    return Request.CreateResponse(HttpStatusCode.NoContent);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { UserDetails });
                }
            }
            catch (Exception ex)
            {
                Log = ex.Message;
                return null;
            }
        }

        private DataTable GetUserDetails(int user_id)
        {
            DAL dbObj = new DAL();
            string Log = "";
            try
            {
                dbObj.openTrustedConnection();
                SqlParameter[] Params = new SqlParameter[1];

                Params[0] = dbObj.sqlParam("@UserID", user_id);

                DataTable dtObj = dbObj.ExecSTPReturnDT("usp_Get_User_Details", Params);
                dbObj.closeConnection();

                return dtObj;
            }
            catch (Exception ex)
            {
                Log = ex.Message;
                return null;
            }
        }
        private bool UpdateUser(int user_id, string first_name, string last_name, string user_name, DateTime DOB)
        {
            DAL dbObj = new DAL();
            string Log = "";
            try
            {
                dbObj.openTrustedConnection();
                SqlParameter[] Params = new SqlParameter[5];

                Params[0] = dbObj.sqlParam("@UserID", user_id);
                Params[1] = dbObj.sqlParam("@FirstName", first_name);
                Params[2] = dbObj.sqlParam("@LastName", last_name);
                Params[3] = dbObj.sqlParam("@UserName", user_name);
                Params[4] = dbObj.sqlParam("@DOB", DOB);

                dbObj.ExecSTP("usp_update_User", Params);
                dbObj.closeConnection();

                return true;
            }
            catch (Exception ex)
            {
                Log = ex.Message;
                return false;
            }
        }
    }
}
