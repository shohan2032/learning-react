import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DbStorageService {
    client = new Client();
    db;
    storage;

    constructor() {
        this.client
           .setEndpoint(conf.appwriteUrl)
           .setProject(conf.appwriteProjectId);
        this.db = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, image, status, userid}) {
        try {
            const post = await this.db.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                    userid,
                }
            );
            return post;
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, {title, content, image, status}) {
        try {
            const post = await this.db.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                }
            );
            return post;
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.db.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Error deleting post", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.db.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return false;
        } catch (error) {
            throw error;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]) {
        try {
            return await this.db.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            throw error;
        }

    }

    // file(image) upload services
    async uploadImage(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            );
        } catch (error) {
            console.log("Error uploading image", error);
            return false;
        }
    }

    async deleteImage(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Error deleting image", error);
            return false;
        }
    }

    getImage(fileId) {
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const dbStorageService = new DbStorageService();

export default dbStorageService;