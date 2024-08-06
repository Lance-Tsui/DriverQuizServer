const { MongoClient } = require('mongodb');

// MongoDB URI
const uri = "mongodb+srv://webmail:19890604@insurancedb.0owihzx.mongodb.net/sample_roadquiz?retryWrites=true&w=majority&appName=insurancedb";

// 创建一个新的 MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        // 连接到 MongoDB
        await client.connect();

        // 获取数据库实例
        const db = client.db("sample_roadquiz");

        // 重命名集合：从 'motors' 到 'motor'
        await db.collection('motors').rename('motor');
        
        console.log('Collection renamed successfully!');
    } catch (err) {
        console.error('Failed to rename collection:', err);
    } finally {
        // 关闭数据库连接
        await client.close();
    }
}

run();
