const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.tasks = functions.https.onRequest((req, res) => {

    const ref = admin.database().ref('tarefas');

    if (req.method === 'GET') {
        return ref.once('value').then(snapshot => {
            return snapshot.val();
        }).catch(() => console.log('error'));
    }    

    if (req.method === 'POST') {
        const nome = req.body.nome;
        return ref.push(nome).then(snapshot => {
            return snapshot.val();
        }).catch(() => console.log('error'));
    }

    if (req.method === 'DELETE') {
        const id = req.body.id;
        return ref.child(id).remove().then(() => {
            res.send('removido', id);
            return null;
        });
    }
});
