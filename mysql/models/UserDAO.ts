import { dbConnection } from "../initMysql";
import { User } from "./User";

class UserDAO{


    async login(username: string, password: string): Promise<User | null>{
        return new Promise((resolve, reject )=> {
            var sqlQuery = "SELECT * FROM user WHERE " + " username=? and password=?";
            var queryVar = [username, password];
            dbConnection.query(sqlQuery, queryVar, function(err, rows){
                if(err) return reject(err);
                else resolve(JSON.parse(JSON.stringify(rows))[0])  
            })
        })
    }
    // saljemo korisnicko ime i lozinku a treba da dobijemp promise ili je odbijen
    // selektujemo sve , izvrsimo query i ako nije greska vraca promise sa podacima
    // on kao podatke daje redove iz tabele i da bi dobili objekte, pretvorimo u string
    // pa u json objekte, i uzmem samo prvi jer ce sigurno biti samo jedan sa tim kor_imenom


    //async register(user: User){
     //   var sqlQuery = "INSERT INTO korisnici VALUES (?, ?, ?, ?)";
      //  var queryVar = [user.kor_ime, user.lozinka, user.ime, user.prezime];
      //  dbConnection.query(sqlQuery, queryVar, function(err, rows){})
    //}
    // saljemo podatke koje insertuje u Korisnici ,tu je SQL upit, tu su podaci
    // i izvrsava query

    async getAllUsers(): Promise<User | null>{
        return new Promise((resolve, reject )=> {
            var sqlQuery = "SELECT * FROM user";
            dbConnection.query(sqlQuery, null, function(err, rows){
                if(err) return reject(err);
                 else resolve(JSON.parse(JSON.stringify(rows)))  
            })
        })
    }
        
}

export const userDAO = new UserDAO()