const { getSessionInfo } = require('../queries/');
const { createPost } = require('./post');

const addRow = async (index, io) => {
    const session = await getSessionInfo();
    if(!session) throw Error('No session exists');
    const height = session.ids.length, width = session.ids[0].length;
    if(index > height) throw Error('Outside the range');

    const row = [];
    for(let i=0; i<width; i++){
        row.push(createPost({}));
    }
    Promise.all(row).then(async pArr => {
        session.ids.splice(index, 0, pArr.map(p => p._id));
        await session.save();
        io.emit('updateData')
    })
}

const addCol = async (index, io) => {
    const session = await getSessionInfo();
    if(!session) throw Error('No session exists');
    const height = session.ids.length, width = session.ids[0].length;
    if(index > width) throw Error('Outside the range');

    const row = [];
    for(let i=0; i<height; i++){
        row.push(createPost({}));
    }
    Promise.all(row).then(async pArr => {
        pArr.forEach((p, i) => {
            session.ids[i].splice(index, 0, p._id);
        });
        // Trigger update
        session.ids.push([]);
        session.ids.pop();

        await session.save();
        io.emit('updateData')
    })
}


module.exports = { addRow, addCol }