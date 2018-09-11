const functions = require('firebase-functions'); 
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
exports.onTaskCreate = functions 
    .database
    .ref('tasks/{taskId}') 
    .onCreate((snapshot, context) => {
        const json = snapshot.val(); 
        const key = context.params.taskId;
        const log = Object.assign({ createdAt: context.timestamp }, json);
        
        return admin    
            .database()
            .ref(`/logs/${key}`)
            .set(log);
    });

exports.onTaskDelete = functions 
    .database
    .ref('tasks/{taskId}') 
    .onDelete((snapshot, context) => {
        const json = snapshot.val(); 
        console.log(json);

        const key = context.params.taskId;
        console.log(key);

        const log = Object.assign({ deleteAt: context.timestamp }, json);
        console.log(log);
        
        return admin    
            .database()
            .ref(`/logs/${key}`)
            .set(log);
    });