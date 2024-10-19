    //this file is made using services so what ever change that wil occure in backend will only affect this file and we only neeed to change content of this files and all other files wont beaffected making code maintainable 
//You can use this as code snipit heheh
import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client() //directly create it 
    account;  //dont assing anything to accout because acount is deendent on client and client is still incomplete

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId); 
        this.account = new Account(this.client) //account create after constructor is called when new authuServices is created 
    }

    async createAccount({email,password,name}){
        try{
            const userAccount  = await this.account.create(ID.unique(),email,password,name)
            if(userAccount){
                //call another method
                return this.login({email,password})
            }else{
                return userAccount
            }
        }catch(error){
            throw error;
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }catch(error){
            throw error
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get()
        }catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        return null;    
    }

    async logout(){
        try{
            await this.account.deleteSessions()
        }catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService()
export default authService