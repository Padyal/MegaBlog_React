//holds major configuration of appwrite

import conf from '../conf/conf.js'
import { Client, ID , Databases , Storage , Query} from "appwrite";

export class Service{
    client = new Client()
    databases
    bucket

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
            return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{title,content,featuredImage,status,userId})
        }catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    } 

    async updatePost(slug,{title,content,featuredImage,status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId, // collectionId
                slug, // documentId
                {title,content,featuredImage,status}, // data (optional)
            )
        }catch(error){
            throw error
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId, // databaseId
                conf.appwriteCollectionId, // collectionId
                slug // documentId
            );
            return true
        }catch(error){
            console.log("Appwrite seriv :: deletePost :: error :-",error)
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId, // databaseId
                conf.appwriteCollectionId, // collectionId
                slug // documentId
            )
        }catch(error){
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(slug){
        try {
            const ans=  await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return ans
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    //file upload method
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId, // bucketId
                ID.unique(), // fileId
                file
            )
        } catch (error) {
            console.log('appwrite service :: upload file :-',error)
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId  
            )
            return true
        } catch (error) {
            console.log('appwrite service :: delete file :-',error)
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(conf.appwriteBucketId,fileId)
    }
}


const service = new Service();
export default service