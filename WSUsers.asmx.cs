using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Services;
using System.Collections;
using System.Web.Script.Services;

namespace FriendSelector
{
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class WSUsers : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        [System.Web.Script.Services.ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public string getUsers()
        {
            string res = "{\"responses\":[";
            List<Users> lu = new List<Users>();
            
            lu.Add(new Users(100, "Usuario 1"));
            lu.Add(new Users(200, "Usuario 2"));
            lu.Add(new Users(300, "Usuario 3"));
            lu.Add(new Users(400, "Usuario 4"));
            lu.Add(new Users(500, "Usuario 5"));
            int cont = 0;
            foreach (Users u in lu)
            {
                cont++;
                res += "{\"id\": " + u.idUser + ",\"name\": \"" + u.nameUser + "\"},";
            }
            if (res.EndsWith(","))
                res = res.Substring(0, res.Length - 1);
            res += "]}";
            return res;
        }
        

    }
    public class Users
    {
        public Users(int id, string name)
        {
            idUser = id;
            nameUser = name;
        }
        public int idUser { get; set; }
        public string nameUser { get; set; }
    }
}
