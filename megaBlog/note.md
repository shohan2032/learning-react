# Backend 
- [appWriter](https://cloud.appwrite.io/console/organization-678f87f400249ce92cd7) It is a backend As A Service.

# For Form
- [react-hook-form](https://react-hook-form.com/)

# Html parser
- [html-react-parser](https://www.npmjs.com/package/html-react-parser)

# Text Editor
- [TinyMCE](https://www.tiny.cloud/docs/tinymce/latest/)

# env variables creation and accessing
- if we create the propject with main react(npm create react-app) then in .env file we have to write the env variables like this: REACT_APP_VARIABLE_NAME = "". Accessing this variable will be like this:
process.env.variable_name

- if we create the project with vite(npm create vite@latest) then in .env file we have to write the project variables like this: VITE_VARIABLE_NAME = "". Accessing this 
variable will be like this: import.meta.env.varibale_name

# Always create a conf object with all the variable names in a conf file so that we can access them easily and it ensures variables are in string.

```javascript
const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),

}

export default conf
```

# Project steps:
- Create a project directory using vite
- create the .env file
- create the conf file
- then create the services
- 
